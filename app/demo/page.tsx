"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, HelpCircle, Trophy } from "lucide-react";
import Marquee from "@/components/ui/marquee";

import confetti from "canvas-confetti";

type Amendment = {
  id: number;
  title: string;
  description: string;
  yearRatified: number;
  funFact: string;
};

const allAmendments: Amendment[] = [
  {
    id: 1,
    title: "First Amendment",
    description:
      "Protects freedom of speech, religion, press, assembly, and petition",
    yearRatified: 1791,
    funFact: "It was James Madison who proposed the First Amendment.",
  },
  {
    id: 2,
    title: "Second Amendment",
    description: "Protects the right to keep and bear arms",
    yearRatified: 1791,
    funFact:
      "The phrase 'well-regulated militia' has been subject to much debate.",
  },
  {
    id: 3,
    title: "Third Amendment",
    description:
      "Prohibits quartering soldiers in private homes without consent",
    yearRatified: 1791,
    funFact: "This is the least litigated amendment in the Bill of Rights.",
  },
  {
    id: 4,
    title: "Fourth Amendment",
    description: "Guards against unreasonable searches and seizures",
    yearRatified: 1791,
    funFact:
      "This amendment is the basis for 'fruit of the poisonous tree' doctrine.",
  },
  {
    id: 5,
    title: "Fifth Amendment",
    description: "Ensures due process and protects against self-incrimination",
    yearRatified: 1791,
    funFact: "The phrase 'pleading the Fifth' comes from this amendment.",
  },
  {
    id: 6,
    title: "Sixth Amendment",
    description: "Guarantees a speedy public trial by an impartial jury",
    yearRatified: 1791,
    funFact: "This amendment is the basis for the 'Miranda rights'.",
  },
  {
    id: 7,
    title: "Seventh Amendment",
    description: "Provides for jury trial in civil cases",
    yearRatified: 1791,
    funFact:
      "This is one of the few amendments not incorporated to the states.",
  },
  {
    id: 8,
    title: "Eighth Amendment",
    description:
      "Prohibits excessive bail, fines, and cruel and unusual punishment",
    yearRatified: 1791,
    funFact:
      "The concept of 'cruel and unusual' changes with societal standards.",
  },
  {
    id: 9,
    title: "Ninth Amendment",
    description:
      "Protects rights not specifically enumerated in the Constitution",
    yearRatified: 1791,
    funFact: "This amendment is often used to argue for privacy rights.",
  },
  {
    id: 10,
    title: "Tenth Amendment",
    description:
      "Reserves powers not delegated to the US to the states or the people",
    yearRatified: 1791,
    funFact: "This amendment is the basis for states' rights arguments.",
  },
];

export default function Demo() {
  const [amendments, setAmendments] = useState<Amendment[]>([]);
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [selectedAmendments, setSelectedAmendments] = useState<number[]>([]);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [matches, setMatches] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState<string | null>(
    null
  );
  const [selectedAmendment, setSelectedAmendment] = useState<number | null>(
    null
  );
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const storedHighScore = localStorage.getItem(
      "constitutionalConnectionsHighScore"
    );
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore));
    }
  }, []);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem(
        "constitutionalConnectionsHighScore",
        score.toString()
      );
    }
  }, [score, highScore]);

  const startGame = () => {
    setSelectedAmendments([]);
    setAmendments([]);
    setDescriptions([]);
    setMatches({});
    setAttemptsLeft(3);
    setGameOver(false);
    setScore(0);
    setGameStarted(false);
    setSelectedDescription(null);
    setSelectedAmendment(null);
    setShowHint(false);
  };

  const startGameWithSelectedAmendments = () => {
    const filteredAmendments = allAmendments.filter((amendment) =>
      selectedAmendments.length > 0
        ? selectedAmendments.includes(amendment.id)
        : true
    );
    const shuffledAmendments = [...filteredAmendments].sort(
      () => Math.random() - 0.5
    );
    const shuffledDescriptions = shuffledAmendments
      .map((amendment) => amendment.description)
      .sort(() => Math.random() - 0.5);

    setAmendments(shuffledAmendments);
    setDescriptions(shuffledDescriptions);
    setMatches({});
    setAttemptsLeft(3);
    setGameOver(false);
    setScore(0);
    setGameStarted(true);
    setSelectedDescription(null);
    setSelectedAmendment(null);
    setShowHint(false);
  };

  const handleMatch = () => {
    if (selectedAmendment !== null && selectedDescription !== null) {
      const correctAmendment = amendments.find(
        (a) => a.id === selectedAmendment
      );

      if (correctAmendment?.description === selectedDescription) {
        setMatches((prev) => {
          const newMatches = {
            ...prev,
            [selectedAmendment]: selectedDescription,
          };
          if (Object.keys(newMatches).length === amendments.length) {
            setGameOver(true);
          }
          return newMatches;
        });
        setScore((prev) => prev + 10);
        if (typeof window !== "undefined") {
          confetti({
            particleCount: 100,
            angle: 60,
            spread: 50,
            origin: { x: 0 },
          });
          confetti({
            particleCount: 100,
            angle: 120,
            spread: 50,
            origin: { x: 1 },
          });
        }
      } else {
        setAttemptsLeft((prev) => {
          if (prev - 1 <= 0) {
            setGameOver(true);
          }
          return prev - 1;
        });
      }

      setSelectedAmendment(null);
      setSelectedDescription(null);
      setShowHint(false);
    }
  };

  const toggleAmendmentSelection = (id: number) => {
    setSelectedAmendments((prev) =>
      prev.includes(id)
        ? prev.filter((amendmentId) => amendmentId !== id)
        : [...prev, id]
    );
  };

  const getHint = () => {
    setShowHint(true);
  };

  const renderGameContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Amendments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {amendments.map((amendment, index) => (
              <motion.div
                key={amendment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Button
                  variant={
                    matches[amendment.id]
                      ? "secondary"
                      : selectedAmendment === amendment.id
                      ? "default"
                      : "outline"
                  }
                  className={`w-full justify-start ${
                    matches[amendment.id] ? "opacity-50" : ""
                  }`}
                  onClick={() =>
                    !matches[amendment.id] && setSelectedAmendment(amendment.id)
                  }
                  disabled={!!matches[amendment.id]}
                >
                  {amendment.title}
                  {matches[amendment.id] && (
                    <CheckCircle2 className="ml-2 h-4 w-4" />
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Descriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {descriptions.map((description, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="relative">
                  <Button
                    variant={
                      Object.values(matches).includes(description)
                        ? "secondary"
                        : selectedDescription === description
                        ? "default"
                        : "outline"
                    }
                    className={`w-full justify-start text-left truncate ${
                      Object.values(matches).includes(description)
                        ? "opacity-50"
                        : ""
                    }`}
                    onClick={() =>
                      !Object.values(matches).includes(description) &&
                      setSelectedDescription(description)
                    }
                    disabled={Object.values(matches).includes(description)}
                  >
                    <div className="relative overflow-hidden">
                      <span className="block whitespace-nowrap hover:animate-scroll">
                        {description}
                      </span>
                    </div>
                    {Object.values(matches).includes(description) && (
                      <CheckCircle2 className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="col-span-1 md:col-span-2 flex justify-center">
        <Button
          size="lg"
          onClick={handleMatch}
          disabled={selectedAmendment === null || selectedDescription === null}
        >
          Match Selected Pair
        </Button>
      </div>

      {selectedAmendment && !showHint && (
        <div className="col-span-1 md:col-span-2 flex justify-center">
          <Button variant="outline" size="sm" onClick={getHint}>
            <HelpCircle className="mr-2 h-4 w-4" />
            Get Hint
          </Button>
        </div>
      )}

      {showHint && selectedAmendment && (
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Hint</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{amendments.find((a) => a.id === selectedAmendment)?.funFact}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderTimeline = () => (
    <Marquee className="py-4" speed={60}>
      {allAmendments.map((amendment) => (
        <div
          key={amendment.id}
          className="flex flex-col items-center mx-8 w-64 "
        >
          <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold mb-2 text-lg">
            {amendment.id}
          </div>
          <h3 className="text-sm font-semibold mb-1 text-center">
            {amendment.title}
          </h3>
          <p className="text-xs text-center">{amendment.description}</p>
          <span className="text-xs text-muted-foreground mt-1">
            Ratified: {amendment.yearRatified}
          </span>
        </div>
      ))}
    </Marquee>
  );

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <h1
        className="bg-clip-text text-2xl md:text-4xl lg:text-7xl font-bold mb-6 font-[family-name:var(--font-geist-sans)] cursor-pointer"
        onClick={() => (window.location.href = "/")}
      >
        The Amendment Challenge
      </h1>

      {!gameStarted && (
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <CardTitle className="text-center">
              Welcome to the Amendment Challenge!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">
              Test your knowledge of the U.S. Constitution amendments. Select
              the amendments you want to include in your game, or play with all
              of them for an extra challenge!
            </p>
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              {allAmendments.map((amendment) => (
                <Badge
                  key={amendment.id}
                  variant={
                    selectedAmendments.includes(amendment.id)
                      ? "default"
                      : "outline"
                  }
                  className="cursor-pointer"
                  onClick={() => toggleAmendmentSelection(amendment.id)}
                >
                  {amendment.title}
                </Badge>
              ))}
            </div>
            <Button onClick={startGameWithSelectedAmendments} size="lg">
              Start Game
            </Button>
          </CardContent>
        </Card>
      )}
      {!gameStarted && (
        <Card className="w-full max-w-4xl mt-8">
          <CardHeader>
            <CardTitle className="text-center">Learn More</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Tabs defaultValue="history">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="importance">Importance</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>
              <TabsContent value="history">
                <p>
                  The amendments to the U.S. Constitution reflect America's
                  evolving democracy. The Bill of Rights, ratified in 1791,
                  guarantees freedoms like speech, religion, and the press,
                  addressing Anti-Federalist concerns about federal power. Later
                  amendments, like the 13th, 14th, and 15th, sought to abolish
                  slavery, ensure equal protection, and prohibit racial voting
                  discrimination. The 19th Amendment granted women the vote, and
                  the 26th lowered the voting age to 18, showcasing the
                  Constitution's ability to adapt to societal changes. Its
                  rigorous amendment process balances flexibility with
                  stability, ensuring enduring relevance while preserving
                  founding principles.
                </p>
              </TabsContent>
              <TabsContent value="importance">
                <p>
                  The Constitution is the foundation of U.S. democracy,
                  establishing a federal government with checks and balances to
                  prevent tyranny. Its adaptability allows for societal growth,
                  seen in amendments abolishing slavery, granting voting rights,
                  and protecting fundamental freedoms like speech and due
                  process. As a living document, it balances stability with
                  change, ensuring fairness, justice, and the protection of
                  individual rights while guiding the nation through evolving
                  challenges.
                </p>
              </TabsContent>
              <TabsContent value="resources">
                <div className="pl-5">
                  <div>
                    <a
                      href="https://www.archives.gov/founding-docs/bill-of-rights-transcript"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      National Archives: Bill of Rights Transcript
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://www.law.cornell.edu/constitution/billofrights"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Cornell Law School: Bill of Rights
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://www.aclu.org/united-states-bill-rights-first-10-amendments-constitution"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      ACLU: United States Bill of Rights
                    </a>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {gameStarted && !gameOver && (
        <>
          <div className="w-full max-w-4xl mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold">Score: {score}</span>
              <span className="text-lg font-semibold">
                High Score: {highScore}
              </span>
            </div>
            <Progress value={(attemptsLeft / 3) * 100} className="w-full" />
            <div className="flex justify-between items-center mt-2">
              <span>Attempts left: {attemptsLeft}</span>
              <span>
                {Object.keys(matches).length} / {amendments.length} matched
              </span>
            </div>
          </div>
          {renderGameContent()}
        </>
      )}

      {gameOver && (
        <>
          <Card className="w-full max-w-4xl mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="mr-2 h-6 w-6 text-yellow-500" />
                Game Over!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl mb-4">Your final score: {score}</p>
              <p className="mb-4">
                You matched {Object.keys(matches).length} out of{" "}
                {amendments.length} amendments correctly.
              </p>
              <Button onClick={startGame} size="lg">
                Start New Game
              </Button>
            </CardContent>
          </Card>
          <div className="w-full max-w-4xl">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Timeline of Amendments
            </h2>
            {renderTimeline()}
          </div>
        </>
      )}
    </div>
  );
}
