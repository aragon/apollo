import React, { Fragment } from "react";
import { Button, Split, CardLayout, GU } from "@aragon/ui";
import { useRouter, withRouter } from "next/router";

import Title from "../components/Title";
import ProjectCard from "../components/Cards/ProjectCard";
import { ARAGON_LOGO } from "../lib/constants";
import "../styles/index.less";

const PROJECTS = [
  {
    label: "Aragon",
    img: ARAGON_LOGO,
    url: "aragon.org",
    token: "ANT"
  },
  {
    label: "Project 2",
    img: ARAGON_LOGO,
    url: "aragon.org",
    token: "TKN2"
  },
  {
    label: "Project 3",
    img: ARAGON_LOGO,
    url: "aragon.org",
    token: "TKN3"
  },
  {
    label: "Project 4",
    img: ARAGON_LOGO,
    url: "aragon.org",
    token: "TKN4"
  },
];

const WelcomePage = (props) => {
  const router = useRouter();

  return (
    <Fragment>
      <Split
        primary={<Title title="Projects" subtitle="Choose a project" />}
        secondary={
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              padding: `${10 * GU}px ${2 * GU}px ${7 * GU}px`,
            }}
          >
            <Button
              style={{ background: "#59A0FF" }}
              mode="strong"
              label="Add Project"
            />
          </div>
        }
      />
      <CardLayout rowHeight={33 * GU} columnWidthMin={31 * GU}>
        {PROJECTS.map(({ img, label }, index) => (
          <ProjectCard
            key={index}
            img={img}
            label={label}
            onOpen={() => {
              router.push("/project");
            }}
          />
        ))}
      </CardLayout>
    </Fragment>
  );
};

export default withRouter(WelcomePage);
