export interface Project{
    
        id: string,
        id_project: number,
        id_project_type: number,
        id_project_client: number,
        id_project_contractor: number,
        project_name: string,
        project_registration: string,
        project_start: string,
        project_end: string,
        project_code: string,
        project_manager: string,
        project_details: string,
        project_active: boolean,
        project_status: boolean,
        client_name: string,
        project_location: string,
        contractor_name: string,
        advance_payment: number,
        project_budget: number,
        project_image: string      
}

