#!/bin/bash

# Supabase Account Migration Script
# Migrates entire project from one account to another

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
CURRENT_PROJECT_ID="hkzrfqpnkvpmsaeluksh"
CURRENT_REGION="us-east-2"

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    if ! command -v supabase &> /dev/null; then
        log_error "Supabase CLI not found. Install it first:"
        echo "npm install -g supabase"
        exit 1
    fi
    
    if ! command -v pg_dump &> /dev/null; then
        log_error "pg_dump not found. Install PostgreSQL tools first."
        exit 1
    fi
    
    if ! command -v psql &> /dev/null; then
        log_error "psql not found. Install PostgreSQL tools first."
        exit 1
    fi
    
    log_success "All prerequisites installed"
}

# Get user input
get_user_input() {
    log_info "Please provide the following information:"
    
    read -p "New Project ID: " NEW_PROJECT_ID
    read -p "New Service Role Key: " NEW_SERVICE_ROLE_KEY
    read -p "New Database Password: " -s NEW_DB_PASSWORD
    echo
    
    if [ -z "$NEW_PROJECT_ID" ] || [ -z "$NEW_SERVICE_ROLE_KEY" ] || [ -z "$NEW_DB_PASSWORD" ]; then
        log_error "Missing required information"
        exit 1
    fi
    
    log_success "Information received"
}

# Export current project
export_current_project() {
    log_info "Exporting current project..."
    
    # Create export directory
    mkdir -p supabase-migration-export
    cd supabase-migration-export
    
    log_info "Exporting database schema..."
    supabase db pull --project-id "$CURRENT_PROJECT_ID" || log_warning "Schema export may have issues"
    
    log_success "Schema exported to supabase/migrations/"
    
    cd ..
}

# Export database data
export_database_data() {
    log_info "Exporting database data..."
    
    # Get current database host
    DB_HOST="db.${CURRENT_PROJECT_ID}.supabase.co"
    
    log_info "Connecting to: $DB_HOST"
    
    # Export data only
    PGPASSWORD="$CURRENT_DB_PASSWORD" pg_dump \
        -h "$DB_HOST" \
        -U postgres \
        -d postgres \
        --data-only \
        --no-owner \
        --no-privileges \
        > supabase-migration-export/database-data.sql
    
    if [ -s supabase-migration-export/database-data.sql ]; then
        log_success "Database data exported"
        log_info "File size: $(du -h supabase-migration-export/database-data.sql | cut -f1)"
    else
        log_error "Database data export failed or is empty"
        exit 1
    fi
}

# Export Edge Functions
export_edge_functions() {
    log_info "Exporting Edge Functions..."
    
    if [ -d "supabase/functions" ]; then
        cp -r supabase/functions supabase-migration-export/
        log_success "Edge Functions exported"
        
        # Count functions
        FUNC_COUNT=$(find supabase-migration-export/functions -maxdepth 1 -type d | wc -l)
        log_info "Found $((FUNC_COUNT - 1)) functions"
    else
        log_warning "No Edge Functions directory found"
    fi
}

# Import to new project
import_to_new_project() {
    log_info "Importing to new project..."
    
    NEW_DB_HOST="db.${NEW_PROJECT_ID}.supabase.co"
    
    log_info "Connecting to new project: $NEW_DB_HOST"
    
    # Import schema
    log_info "Importing database schema..."
    supabase db push --project-id "$NEW_PROJECT_ID" || log_warning "Schema import may have issues"
    
    log_success "Schema imported"
}

# Import database data
import_database_data() {
    log_info "Importing database data..."
    
    NEW_DB_HOST="db.${NEW_PROJECT_ID}.supabase.co"
    
    PGPASSWORD="$NEW_DB_PASSWORD" psql \
        -h "$NEW_DB_HOST" \
        -U postgres \
        -d postgres \
        -f supabase-migration-export/database-data.sql
    
    log_success "Database data imported"
}

# Deploy Edge Functions
deploy_edge_functions() {
    log_info "Deploying Edge Functions to new project..."
    
    if [ -d "supabase-migration-export/functions" ]; then
        supabase functions deploy --project-id "$NEW_PROJECT_ID"
        log_success "Edge Functions deployed"
    else
        log_warning "No Edge Functions to deploy"
    fi
}

# Main execution
main() {
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║     Supabase Account Migration Script                      ║"
    echo "║     From: $CURRENT_PROJECT_ID                    ║"
    echo "║     To: [New Project]                                      ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo
    
    check_prerequisites
    get_user_input
    
    log_warning "Starting migration... This will take 1-2 hours"
    log_warning "Do not interrupt this process"
    echo
    
    export_current_project
    export_database_data
    export_edge_functions
    
    log_info "Export complete. Starting import..."
    echo
    
    import_to_new_project
    import_database_data
    deploy_edge_functions
    
    echo
    log_success "Migration complete!"
    log_info "Next steps:"
    echo "  1. Update environment variables in your app"
    echo "  2. Update Stripe webhook URL"
    echo "  3. Test all functionality"
    echo "  4. Monitor logs for errors"
    echo
    log_info "Migration files saved in: supabase-migration-export/"
}

# Run main function
main "$@"

