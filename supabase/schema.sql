-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create tables
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) CHECK (status IN ('in_development', 'in_maintenance', 'in_production', 'upcoming', 'archived')),
    type VARCHAR(50) CHECK (type IN ('frontend', 'backend', 'figma')),
    client VARCHAR(255),
    thumbnail TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    created_by UUID REFERENCES auth.users(id),
    team_id UUID
);

CREATE TABLE IF NOT EXISTS public.project_environments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    env_type VARCHAR(50) CHECK (env_type IN ('development', 'staging', 'production', 'figma')),
    frontend_url TEXT,
    backend_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.project_tech_stack (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    technology VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.teams (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    created_by UUID REFERENCES auth.users(id)
);

CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role VARCHAR(50) CHECK (role IN ('owner', 'admin', 'member')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(team_id, user_id)
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.project_environments
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_environments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_tech_stack ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Create policies for projects
CREATE POLICY "Enable read access for team members" ON public.projects
    FOR SELECT
    USING (
        auth.uid() IN (
            SELECT user_id 
            FROM public.team_members 
            WHERE team_id = projects.team_id
        )
    );

CREATE POLICY "Enable insert for authenticated users" ON public.projects
    FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Enable update for team members" ON public.projects
    FOR UPDATE
    USING (
        auth.uid() IN (
            SELECT user_id 
            FROM public.team_members 
            WHERE team_id = projects.team_id
        )
    )
    WITH CHECK (
        auth.uid() IN (
            SELECT user_id 
            FROM public.team_members 
            WHERE team_id = projects.team_id
        )
    );

CREATE POLICY "Enable delete for team admins" ON public.projects
    FOR DELETE
    USING (
        auth.uid() IN (
            SELECT user_id 
            FROM public.team_members 
            WHERE team_id = projects.team_id
            AND role IN ('owner', 'admin')
        )
    );

-- Create policies for project_environments
CREATE POLICY "Enable read access for team members" ON public.project_environments
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 
            FROM public.projects p
            JOIN public.team_members tm ON tm.team_id = p.team_id
            WHERE p.id = project_environments.project_id
            AND tm.user_id = auth.uid()
        )
    );

CREATE POLICY "Enable insert for team members" ON public.project_environments
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 
            FROM public.projects p
            JOIN public.team_members tm ON tm.team_id = p.team_id
            WHERE p.id = project_environments.project_id
            AND tm.user_id = auth.uid()
        )
    );

-- Create policies for project_tech_stack
CREATE POLICY "Enable read access for team members" ON public.project_tech_stack
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 
            FROM public.projects p
            JOIN public.team_members tm ON tm.team_id = p.team_id
            WHERE p.id = project_tech_stack.project_id
            AND tm.user_id = auth.uid()
        )
    );

CREATE POLICY "Enable insert for team members" ON public.project_tech_stack
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 
            FROM public.projects p
            JOIN public.team_members tm ON tm.team_id = p.team_id
            WHERE p.id = project_tech_stack.project_id
            AND tm.user_id = auth.uid()
        )
    );

-- Create policies for teams
CREATE POLICY "Enable read access for team members" ON public.teams
    FOR SELECT
    USING (
        auth.uid() IN (
            SELECT user_id 
            FROM public.team_members 
            WHERE team_id = teams.id
        )
    );

CREATE POLICY "Enable insert for authenticated users" ON public.teams
    FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Enable update for team admins" ON public.teams
    FOR UPDATE
    USING (
        auth.uid() IN (
            SELECT user_id 
            FROM public.team_members 
            WHERE team_id = teams.id
            AND role IN ('owner', 'admin')
        )
    )
    WITH CHECK (
        auth.uid() IN (
            SELECT user_id 
            FROM public.team_members 
            WHERE team_id = teams.id
            AND role IN ('owner', 'admin')
        )
    );

-- Create policies for team_members
CREATE POLICY "Enable read access for team members" ON public.team_members
    FOR SELECT
    USING (
        auth.uid() IN (
            SELECT user_id 
            FROM public.team_members 
            WHERE team_id = team_members.team_id
        )
    );

CREATE POLICY "Enable insert for team admins" ON public.team_members
    FOR INSERT
    WITH CHECK (
        auth.uid() IN (
            SELECT user_id 
            FROM public.team_members 
            WHERE team_id = NEW.team_id
            AND role IN ('owner', 'admin')
        )
    );

CREATE POLICY "Enable delete for team admins" ON public.team_members
    FOR DELETE
    USING (
        auth.uid() IN (
            SELECT user_id 
            FROM public.team_members 
            WHERE team_id = team_members.team_id
            AND role IN ('owner', 'admin')
        )
    );