//VIEW PROFILE

import ProfileForm from "@/components/profile/ProfileForm";
import { useAuth } from "@/hooks/useAuth";

function ProfileView() {
    //Hook
    const { data, isLoading } = useAuth();

    if(isLoading) return 'Cargando...';

    //---VIEW---//
    if(data) return (
        <ProfileForm  data={data} />
    )
}

export default ProfileView;