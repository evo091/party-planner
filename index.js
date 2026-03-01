const state = {
    parties: [],
    selectedParty: null,
}

const BASE_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/'; 
const COHORT = '2601-FTB-CT-WEB-PT-IAN';
const API = `${BASE_URL}${COHORT}`;
const app = document.querySelector('#app');

const pageHeader = document.createElement('h1');
pageHeader.textContent = 'Party Planner';

const mainContainer = document.createElement('main');
mainContainer.classList.add('vertical_split');

app.append(pageHeader, mainContainer);

const fetchParties = async () => {
     const partiesResponse = await fetch (`${API}/events`);
     const partiesJSON = await partiesResponse.json();

     return partiesJSON.data;
};

const fetchPartyDetails = async (party) => {
    const partyDetailsResponse = await fetch(`${API}/events/${party.id}`);
    const partyDetailsJSON = await partyDetailsResponse.json();

    return partyDetailsJSON.data;
}

const createPartyListItem = (party) => {
    const partyListItem = document.createElement ('div');
    partyListItem.classList.add('party-list-item');

    const partyListItemName = document.createElement('span');

    partyListItemName.textContent = party.name;

    partyListItem.addEventListener('click', async () => {
        const partyDetails = await fetchPartyDetails(party);

    console.log('Party Details: ', partyDetails);

        state.selectedParty = partyDetails;

        render();
    });

    

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

const createPartyDetails = (partyDetails) => {
    const partyDetailsContainer = document.createElement ('div');
    partyDetailsContainer.classList.add('party-details-container');

    const partyDetailsHeader = document.createElement('h2');
    partyDetailsHeader.textContent = 'Party Details';

    partyDetailsContainer.append(partyDetailsHeader);

   if (!partyDetails) {
        const noDetailsText = document.createElement('span');
        noDetailsText.textContent = 'No party selected. Please select a party.';

        partyDetailsContainer.append(noDetailsText);
    } else {
        const partyDetails = document.createElement('div');
        partyDetails.classList.add('party-details');

        const subPartyDetailsHeader = document.createElement('h4');
        subPartyDetailsHeader.textContent = `${state.selectedParty.name} #${state.selectedParty.id}`;

        const subPartyDetailsDate = document.createElement('span');
        subPartyDetailsDate.textContent = state.selectedParty.date;

        const subPartyDetailsLocation = document.createElement('span');
        subPartyDetailsLocation.textContent = state.selectedParty.location;

        const subPartyDetailsDescription = document.createElement('p');
        subPartyDetailsDescription.textContent = state.selectedParty.description;

        partyDetails.append(
            subPartyDetailsHeader,
            subPartyDetailsDate,
            subPartyDetailsLocation,
            subPartyDetailsDescription,
        )
    }

    return partyDetailsContainer;

};

function render () {
    const partyList = createPartyList(state.parties);
    const partyDetails = createPartyDetails(state.selectedParty);

    mainContainer.replaceChildren(partyList, partyDetails);
}

const startApp = async () => {
    const parties = await fetchParties();

    state.parties = parties;

    render();
}

startApp();