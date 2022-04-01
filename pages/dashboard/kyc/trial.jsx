import PrivateLimitedCompany from "../../../components/KycForm/RegisteredBusinessFlow/DocumentUploads/PrivateLimitedCompany";
import SoleProprietorship from "../../../components/KycForm/RegisteredBusinessFlow/DocumentUploads/SoleProprietorship";
import GovernmentDepartment from "../../../components/KycForm/RegisteredBusinessFlow/DocumentUploads/GovernmentDepartment";
import Trust from "../../../components/KycForm/RegisteredBusinessFlow/DocumentUploads/Trust";
import ProfessionalEntities from "../../../components/KycForm/RegisteredBusinessFlow/DocumentUploads/ProfessionalEntities";
import LearningInstitution from "../../../components/KycForm/RegisteredBusinessFlow/DocumentUploads/LearningInstitution";
import WelfareGroups from "../../../components/KycForm/RegisteredBusinessFlow/DocumentUploads/WelfareGroups";

function trial(props) {
  return (
    <div>
      <PrivateLimitedCompany />
      <SoleProprietorship />
      <GovernmentDepartment />
      <Trust />
      <ProfessionalEntities />
      <LearningInstitution />
      <WelfareGroups />
    </div>
  );
}

export default trial;
