import { AddEditResourceDialog } from './add_edit_resource_dialog';
import { AddEditRoleDialog } from './add_edit_role_dialog';
import { AddEditSkillDialog } from './add_edit_skill_dialog';
import { AddEditTeamDialog } from './add_edit_team_dialog';
import { ResourceDetailDialog } from './resource_detail_dialog';

export function DialogComponent() {

  return (
    <><AddEditTeamDialog></AddEditTeamDialog>
    <ResourceDetailDialog></ResourceDetailDialog>
    <AddEditSkillDialog></AddEditSkillDialog>
    <AddEditRoleDialog></AddEditRoleDialog>
    <AddEditResourceDialog></AddEditResourceDialog>
    </>
  );
}
