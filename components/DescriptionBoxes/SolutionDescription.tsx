//TODO merge this component with ProblemDescription component
import React, { useEffect, useState } from "react";
import { Card, GU, useTheme, Button } from "@aragon/ui";
import Link from "next/link";

import VotingButtons from "../VotingButtons";
import { Proposal } from "../../pages/[project]/problems";

function SolutionDescription({ project, problem }: SolutionDescriptionInfo) {
  const theme = useTheme();

  // STATE & EFFECT ======================================================================

  const [error, setError] = useState(null);
  const [votes, setVotes] = useState<Vote[]>([]);

  // get all votes related to a particular problem/Solution of a praticular project from
  // snapshot
  useEffect(() => {
    fetch(
      `https://testnet.snapshot.page/api/${project}/proposal/${problem.authorIpfsHash}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then((data) => Object.values(data))
      .then((votes) => {
        let mapped_votes = votes.map((vote) => {
          return new Vote(problem, vote.msg.payload.choice);
        });
        setVotes(mapped_votes);
      })
      .catch((reason) => {
        setError(reason);
      });
  }, []);

    // HELPERS =============================================================================

    function countVotes(kind: string): number {
      if (kind === "up") {
        return votes.filter((v) => v.choice === 1).length;
      } else if (kind === "down") {
        return votes.filter((v) => v.choice === 2).length;
      }
    }
  
  // RENDERER ============================================================================

  return error ? (
    <Card
      width="95%"
      height="auto"
      style={{
        marginTop: `${4 * GU}px`,
        background: "#FFF4F6",
        borderRadious: `10px`,
      }}
    >
      <div style={{ marginTop: `${5 * GU}px`, textAlign: "center" }}>
        <h2>
          Unfortunately, there was an error when retrieving this solution
          proposal.
        </h2>
      </div>
    </Card>
  ) : (
    <Card
      width="95%"
      height="auto"
      style={{
        marginTop: `${4 * GU}px`,
        background: "#F6FCFF",
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
        <p
          style={{
            fontSize: "14px",
            color: `${theme.surfaceContentSecondary}`,
          }}
        >
          Reported by: {problem.address}
        </p>
        <Link
          href={{
            pathname: "/[project]/[problem]/solutions",
            query: { project: project, problem: problem.authorIpfsHash },
          }}
          passHref
        >
          <Button external={false} mode="inactive" disabled={true}>
            Application
          </Button>
        </Link>
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
            {problem.msg.payload.name}
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: `${theme.surfaceContentSecondary}`,
            }}
          >
            {problem.msg.payload.body}
          </p>
        </div>
      </section>
      <VotingButtons
        proposal={problem.authorIpfsHash}
        no_upvotes={countVotes("up")}
        no_downvotes={countVotes("down")}
      />
    </Card>
  );
}

// TYPES =================================================================================

class Vote {
  proposal: Proposal;
  choice: number;

  constructor(proposal, choice) {
    this.proposal = proposal;
    this.choice = choice;
  }
}

type SolutionDescriptionInfo = {
  project: string | string[];
  problem: Proposal;
};

export default SolutionDescription;
