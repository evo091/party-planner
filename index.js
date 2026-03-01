const state = {
    parties: [],
    selectedParty: [],
}

const BASE_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/'; 
const COHORT = '2601-FTB-CT-WEB-PT';
const API = `${BASE_URL}${COHORT}`;
const app = document.querySelector('#app');

const pageHeader = document.createElement('h1');
pageHeader.textContent = 'Party Planner';

const mainContainer = document.createElement('main');
mainContainer.classList.add('vertical_split');

app.append(pageHeader, mainContainer);

const createPartyListItem = (party) => {
    const partyListItem = document.createElement ('div');
    partyListItem.classList.add('party-list-item');

    const partyListItemName = document.createElement('span');

    partyListItemName.textContent = party.name;

    partyListItem.append(partyListItemName);

    return partyListItem;
}

const createPartyList = (parties) => {
    const partyListContainer = document.createElement ('div')
    partyListContainer.classList.add('party-list-container')

    const partyListHeader = document.createElement('h2');
    partyListHeader.textContent = 'Upcoming Parties';

    partyListContainer.append(partyListHeader);

    const listItemContainer = document.createElement('div');

    const partyListItems = parties.map((party) => createPartyListItem(party));

    listItemContainer.replaceChildren(...partyListItems);

    partyListContainer.append(listItemContainer);

    return partyListContainer;

}

/*const createPartyDetails = (partyDetails) => {
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

    partyDetails.append(partyDetailsContainer);

    return partyDetails;

};*/

const fetchParties = async () => {
     const partiesResponse = await fetch (`${API}/events`);
     const partiesJSON = await partiesResponse.json();

     return partiesJSON.data;
};

function render () {
    const partyList = createPartyList(state.parties);

    mainContainer.replaceChildren(partyList);
}

const startApp = async () => {
    const parties = await fetchParties();

    state.parties = parties;

    render();
}

startApp();