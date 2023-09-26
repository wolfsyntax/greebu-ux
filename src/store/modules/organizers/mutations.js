export const SET_EVENT_TYPES = (state, payload) => {
  state.eventTypes = payload
}

export const SET_STAFF_ROLES = (state, payload) => {
  state.staffRoles = payload
}

export const CLEAR_ORGANIZER_STATE = (state) =>
{

  state.staff = [];

  state.staffIndex = -1;
  state.form = {
    avatar: '',
    company_name: '',
    organizer_name: '',
    progress: null,
    event_types: [],
    street_address: '',
    city: '',
    province: '',
    bio: '',
    facebook: '',
    twitter: '',
    instagram: '',
    threads: '',
    accept_proposal: false,
    send_proposal: false,
  }
  state.eventTypes = [
    "Battle of the bands",
    "Weddings",
    "Concerts",
    "Bar Events",
  ];

  state.staffRoles = [
    "Event Coordinator",
    "Event Manager/Director",
    "Marketing and Promotion Manager",
    "Operations Manager",
  ];

  state.occupations = [
    {
      name: 'Accounting & Consulting',
    },
    {
      name: 'Amin Support',
    },
    {
      name: 'Customer Service',
    },
    {
      name: 'Data Science & Analytics',
    },
    {
      name: 'Design & Creative',
      children: [
        {
          name: 'Art & Illustration',
          children: [
            {
              name: 'Art & Illustration',
              children: [
                { name: 'Audio & Music Production' },
                { name: 'Branding & Logo Design' },
                { name: 'NFT, AR/VR & Game Art' },
                { name: 'Graphic, Editorial & Presentation Design' },
                {
                  name: 'Performing Arts',
                  children: [
                    {
                      name: 'Audio & Music Production',
                      children: [
                        {
                          name: 'Accounting & Consulting',
                        },
                        {
                          name: 'Amin Support',
                        },
                        {
                          name: 'Customer Service',
                        },
                        {
                          name: 'Data Science & Analytics',
                        },
                      ]
                    },
                    { name: 'Branding & Logo Design' },
                    { name: 'NFT, AR/VR & Game Art' },
                    { name: 'Graphic, Editorial & Presentation Design' },
                    { name: 'Performing Arts' },
                    { name: 'Photography' },
                    { name: 'Product Design' },
                    { name: 'Video & Animation' },
                  ]
                },
                { name: 'Photography' },
                { name: 'Product Design' },
                { name: 'Video & Animation' },
              ]
            },
            { name: 'Audio & Music Production' },
            { name: 'Branding & Logo Design' },
            { name: 'NFT, AR/VR & Game Art' },
            { name: 'Graphic, Editorial & Presentation Design' },
            { name: 'Performing Arts' },
            { name: 'Photography' },
            { name: 'Product Design' },
            { name: 'Video & Animation' },
          ]
        },
        { name: 'Audio & Music Production' },
        { name: 'Branding & Logo Design' },
        { name: 'NFT, AR/VR & Game Art' },
        { name: 'Graphic, Editorial & Presentation Design' },
        { name: 'Performing Arts' },
        { name: 'Photography' },
        { name: 'Product Design' },
        { name: 'Video & Animation' },
      ]
    },
    {
      name: 'Engineering & Architecture',
    },
    {
      name: 'IT & Networking',
    },
    {
      name: 'Legal',
    },
    {
      name: 'Sales & Marketing',
    },
    {
      name: 'Translation',
    },
    {
      name: 'Web, Mobile & Software Dev',
    },
    {
      name: 'Writing',
    }
  ];

}

export const SET_STAFF_FILTER = (state, index = -1) =>
{
  state.staffIndex = index

  if (index > -1) {
    state.staffFilter = state.staff[index];
    state.staffRole = state.staff[index].role;
  } else {
    state.staffFilter = {};
    state.staffRole = '';
  }

}

export const SET_STAFF = (state, payload) => {
  state.staff = payload || [];
}

export const SET_ORGANIZER_FORM = (state, payload) =>
{
  state.form = payload
}