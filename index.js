const state = {
    parties: [],
    selectedParty: null,
}

const BASE_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api'; 
const COHORT = '2601-FTB-CT-WEB-PT';
const API = `${BASE_URL}${COHORT}`;
const app = document.querySelector('#app');

const pageHeader = document.createElement('h1');
pageHeader.textContent - 'Party Planner';

const mainContainer = document.createElement('main');
mainContainer.classList.add('vertical_split');

app.append(pageHeader, mainContainer);

const createPartyListItem = (party) => {
    const partyListItem = document.createElement ('div');
    partyListItem.classList.add('party-list-item');



}

const createPartyList = () => {
    const partyListContainer = document.createElement ('div')
    partyListContainer.classList.add('party-list-container')

    const partyListHeader = document.createElement('h2');
    partyListHeader.textContent = 'Upcoming Parties';

}

const createPartyDetails = (partyDetails) => {
    const partyDetailsContainer = document.createElement ('div');
    partyDetailsContainer.classList.add('party-details-container');

    const partyDetailsHeader = document.createElement('h2');
    partyDetailsHeader.textContent = 'Party Details';

    if (!partyDetails) {
        const noDetailsText = document.createElement('span');
        noDetailsText.textConstent = 'No party selected. Please select a party.';

        partyDetailsContainer.append(noDetailsText);
    } else {
        const partyDetails = document.createElement('div');
        partyDetails.classListAdd('party-details');
    }

    partyDetails.append ();

}

function render () {
    const partyList = createPartyList(state.parties);
    const partyDetails = createPartyDetails
}

const startApp = async () => {
    const parties = await 
