import enMessages from './messages/en'; // Import your default messages
import esMessages from './messages/es'; // Import other language messages
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
export const locale = 'en'; // Set the default locale here
export const messages = { en: enMessages, es: esMessages }; // Include messages for all supported locales



i18next.use(initReactI18next).init({
  lng: 'en', // if you're using a language detector, do not define the lng option
  debug: true,
  resources: {
    en: {
      translation: {
        resources: {
          searchResource: "Search for a resource...",
          resourceRemoved: "Resource has been removed.",
          resourceDetail: "Resource detail",
          search: "Search for a resource...",          
          removed: "The resource has been removed",
          created : "resource successfully created",
          updated : "resource successfully updated",
          createNew : "Create new resource",
          labelNewName : "New resource Name",
          lastName : "Last name",
          birthDate : "Birth date",
          occupation : "Occupation",
          locality : "Locality",
          biography : "Biography",
          add : " Add resource",
          edit : " Edit resource",          
        },
        common: {
          noResults: "Sorry, no results to display at the moment...",
          create: "Create",
          edit: "Edit",
          cancel: "Cancel",
          skills: "Skills",
          role : "Role",
          biography: "Biography",
          okay:"Okay",
          helperDate:"Please use the dd/mm/yyyy format."
        },
        teams: {
          searchTeam: "Search for a team...",
          selectTeam: "Please choose a team",
          teamMembers: "Team Members",
          selectATeamFirst: "Please select a team first",
          resourceAlreadyInTeam: "This resource is already a part of the team",
          resourceAddedToTeam: "Resource successfully added to the team",
          teamRemoved: "The team has been removed",
          teamCreated : "Team successfully created",
          teamUpdated : "Team successfully updated",
          createNewTeam : "Create new Team",
          labelNewTeamName : "New Team Name",
          addTeam : " Add Team",
          editTeam : " Edit Team",
        },
        skills:{
          search: "Search for a skill...",          
          removed: "The Skill has been removed",
          created : "Skill successfully created",
          updated : "Skill successfully updated",
          createNew : "Create new Skill",
          labelNewName : "New Skill Name",
          add : " Add Skill",
          edit : " Edit Skill",
        },
        roles:{
          search: "Search for a role...",          
          removed: "The role has been removed",
          created : "role successfully created",
          updated : "role successfully updated",
          createNew : "Create new role",
          labelNewName : "New role Name",
          add : " Add role",
          edit : " Edit role",
        },
        error: {
          common: {
            anErrorOccurred: "Oops! An error occurred. Please try again later."
          }
        }
      }
    },
    es: {
      translation: {
        resources: {
          searchResource: "Buscar un recurso...",
          resourceRemoved: "El recurso ha sido eliminado."
        },
        common: {
          noResults: "Lo sentimos, no hay resultados para mostrar en este momento..."
        },
        teams: {
          searchTeam: "Buscar un equipo...",
          selectTeam: "Por favor, elija un equipo",
          teamMembers: "Miembros del equipo",
          selectATeamFirst: "Por favor, seleccione primero un equipo",
          resourceAlreadyInTeam: "Este recurso ya forma parte del equipo",
          resourceAddedToTeam: "Recurso añadido con éxito al equipo",
          teamRemoved: "El equipo ha sido eliminado"
        },
        error: {
          common: {
            anErrorOccurred: "¡Oops! Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde."
          }
        }
      }
    }
  }
  
});
// initialized and ready to go!
// i18next is already initialized, because the translation resources where passed via init function
