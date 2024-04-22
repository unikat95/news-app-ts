import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { NewsContext } from "../context/NewsContext";
import Container from "../components/Container/Container";
import UserProfile from "../components/UserProfile/UserProfile";
import UserArticles from "../components/UserArticles/UserArticles";

export default function User() {
  const { usersList } = useContext(NewsContext) || {};
  const { id } = useParams();

  const user = usersList?.find((user) => user.id === id);

  if (!user) return;

  return (
    <>
      <Container>
        <div className="w-full flex flex-col lg:flex-row gap-5 justify-start items-start">
          <UserProfile user={user} />
          <UserArticles user={user} />
        </div>
      </Container>
    </>
  );
}
