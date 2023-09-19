var state = {
    occupations: [
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
                  {name: 'Audio & Music Production'},
                  {name: 'Branding & Logo Design'},
                  {name: 'NFT, AR/VR & Game Art'},
                  {name: 'Graphic, Editorial & Presentation Design'},
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
                      {name: 'Branding & Logo Design'},
                      {name: 'NFT, AR/VR & Game Art'},
                      {name: 'Graphic, Editorial & Presentation Design'},
                      {name: 'Performing Arts'},
                      {name: 'Photography'},
                      {name: 'Product Design'},
                      {name: 'Video & Animation'},
                    ]
                  },
                  {name: 'Photography'},
                  {name: 'Product Design'},
                  {name: 'Video & Animation'},
                ]
              },
              {name: 'Audio & Music Production'},
              {name: 'Branding & Logo Design'},
              {name: 'NFT, AR/VR & Game Art'},
              {name: 'Graphic, Editorial & Presentation Design'},
              {name: 'Performing Arts'},
              {name: 'Photography'},
              {name: 'Product Design'},
              {name: 'Video & Animation'},
            ]
          },
          {name: 'Audio & Music Production'},
          {name: 'Branding & Logo Design'},
          {name: 'NFT, AR/VR & Game Art'},
          {name: 'Graphic, Editorial & Presentation Design'},
          {name: 'Performing Arts'},
          {name: 'Photography'},
          {name: 'Product Design'},
          {name: 'Video & Animation'},
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
    ]
  }
  
  export default state