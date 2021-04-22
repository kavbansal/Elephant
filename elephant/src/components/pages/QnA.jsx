import React from 'react';

import NavPills from "./NavPills.jsx";
import GridItem from "../Grid/GridItem";

export default function QnA(){
    return (
        <GridItem xs={12} sm={12} md={12} lg={6}>
        <NavPills
            color="warning"
            horizontal={{
                tabsGrid: { xs: 12, sm: 4, md: 4 },
                contentGrid: { xs: 12, sm: 8, md: 8 }
            }}
            tabs={[
                {
                    tabButton: "Profile",
                    tabContent: (
                        <span>
              <p>
                Collaboratively administrate empowered markets via
                plug-and-play networks. Dynamically procrastinate
                B2C users after installed base benefits.
              </p>
              <br />
              <p>
                Dramatically visualize customer directed convergence
                without revolutionary ROI. Collaboratively
                administrate empowered markets via plug-and-play
                networks. Dynamically procrastinate B2C users after
                installed base benefits.
              </p>
              <br />
              <p>This is very nice.</p>
            </span>
                    )
                },
                {
                    tabButton: "Settings",
                    tabContent: (
                        <span>
              <p>
                Efficiently unleash cross-media information without
                cross-media value. Quickly maximize timely
                deliverables for real-time schemas.
              </p>
              <br />
              <p>
                Dramatically maintain clicks-and-mortar solutions
                without functional solutions.
              </p>
            </span>
                    )
                },
                {
                    tabButton: "Options",
                    tabContent: (
                        <span>
              <p>
                Completely synergize resource taxing relationships
                via premier niche markets. Professionally cultivate
                one-to-one customer service with robust ideas.{" "}
              </p>
              <br />
              <p>
                Dynamically innovate resource-leveling customer
                service for state of the art customer service.
              </p>
            </span>
                    )
                }
            ]}
        />
        </GridItem>
    );
}