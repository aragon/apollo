//TODO merge this component with ProblemDescription component
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, GU, useTheme, Button } from "@aragon/ui";
import VotingButtons from "../VotingButtons";
import { Proposal } from "../../pages/problems";

function ProblemDescription({ problem }) {
  const theme = useTheme();

  function countVotes(kind: String): number {
    if (kind === 'up') {
      return votes.filter(v => v.choice === 1).length
    } else if (kind === 'down') {
      return votes.filter(v => v.choice === 2).length
    }
  }

  const [votes, setVotes] = useState<Vote[]>([]);
  useEffect(() => {
    fetch("https://hub.snapshot.page/api/aragon/proposal/" + problem.hash)
      .then((response) => response.json())
      .then((data) => Object.values(data))
      .then((votes) =>
        votes.map((vote) => {
          return new Vote(problem, vote.msg.payload.choice);
        })
      )
      .then((mapped_votes) => {
        let newVotes = votes.concat(mapped_votes);
        setVotes(newVotes);
      });
  }, []);

  return (
    <Card
      width="95%"
      height="auto"
      style={{
        marginTop: `${4 * GU}px`,
        background: "#FFF4F6",
        borderRadious: `10px`,
      }}
    >
      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          width: "100%",
          padding: `${2 * GU}px ${2 * GU}px ${2 * GU}px  ${3 * GU}px`,
          borderRadius: "10px",
        }}
      >
        {/* TODO extract this into component */}
        <p
          style={{
            fontSize: "14px",
            color: `${theme.surfaceContentSecondary}`,
          }}
        >
          Reported by: {problem.reporter}
        </p>
        <Button href="/solutions" external={false} mode="strong">
          Solutions
        </Button>
      </section>
      <section
        style={{
          width: "100%",
          padding: `${1 * GU}px ${2 * GU}px ${2 * GU}px  ${3 * GU}px`,
          borderRadius: "10px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "25px",
              fontWeight: "bold",
              marginBottom: `${0.5 * GU}px`,
            }}
          >
            {problem.title}
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: `${theme.surfaceContentSecondary}`,
            }}
          >
            {problem.description}
          </p>
        </div>
      </section>
      {votes.length === 0 ? (
        <VotingButtons
          no_upvotes={-1}
          no_downvotes={-1}
        />
      ) : (
        <VotingButtons
          no_upvotes={countVotes("up")}
          no_downvotes={countVotes("down")}
        />
      )}
    </Card>
  );
}

export default ProblemDescription;

class Vote {
  proposal: Proposal;
  choice: number;

  constructor(proposal, choice) {
    this.proposal = proposal;
    this.choice = choice;
  }
}