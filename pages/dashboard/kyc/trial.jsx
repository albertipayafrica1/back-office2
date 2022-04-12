import PrivateLimitedCompany from "../../../components/KycForm/RegisteredBusinessFlow/DocumentUploads/PrivateLimitedCompany";
import SoleProprietorship from "../../../components/KycForm/RegisteredBusinessFlow/DocumentUploads/SoleProprietorship";
import GovernmentDepartment from "../../../components/KycForm/RegisteredBusinessFlow/DocumentUploads/GovernmentDepartment";
import Trust from "../../../components/KycForm/RegisteredBusinessFlow/DocumentUploads/Trust";
import ProfessionalEntities from "../../../components/KycForm/RegisteredBusinessFlow/DocumentUploads/ProfessionalEntities";
import LearningInstitution from "../../../components/KycForm/RegisteredBusinessFlow/DocumentUploads/LearningInstitution";
import WelfareGroups from "../../../components/KycForm/RegisteredBusinessFlow/DocumentUploads/WelfareGroups";
import PersonalDetailsForm from "../../../components/KycForm/UnRegisteredBusinessFlow/PersonalDetailsForm";
import BankDetailsForm from "../../../components/KycForm/UnRegisteredBusinessFlow/BankDetailsForm";
import ComplianceForm from "../../../components/KycForm/UnRegisteredBusinessFlow/ComplianceForm";
import Medical from "../../../components/KycForm/UnRegisteredBusinessFlow/DocumentUploads/Medical";
import Education from "../../../components/KycForm/UnRegisteredBusinessFlow/DocumentUploads/Education";
import Wedding from "../../../components/KycForm/UnRegisteredBusinessFlow/DocumentUploads/Wedding";
import Funeral from "../../../components/KycForm/UnRegisteredBusinessFlow/DocumentUploads/Funeral";
import FundRaising from "../../../components/KycForm/UnRegisteredBusinessFlow/DocumentUploads/FundRaising";
import CreateAccountOtpDialog from "../../../components/CreateAccountOtpDialog";
import CakeContainer from "../../../components/TrialForRedux/CakeContainer";
import UserContainer from "../../../components/TrialForRedux/UserContainer";

function trial(props) {
  return (
    <div>
      {/* <PrivateLimitedCompany />
      <SoleProprietorship />
      <GovernmentDepartment />
      <Trust />
      <ProfessionalEntities />
      <LearningInstitution />
      <WelfareGroups />
      <PersonalDetailsForm />
      <ComplianceForm />
      <Medical />
      <Education />
      <Wedding />
      <Funeral />
      <FundRaising />
      <BankDetailsForm /> */}
      {/* <CreateAccountOtpDialog open /> */}
      <CakeContainer />
      <UserContainer />
    </div>
  );
}

export default trial;
