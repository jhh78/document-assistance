"use client";
import { NextPage } from "next";
import React from "react";
import Game from "@/component/typing/Game";
import FileUploadForm from "@/component/typing/FileUploadForm";
import { GAME_PAGE, TITLE_PAGE, useTypingGameStore } from "@/stores/typing";

const Page: NextPage = () => {
  const screenMode = useTypingGameStore((state) => state.screenMode);

  return (
    <React.Fragment>
      {screenMode === TITLE_PAGE && <FileUploadForm />}
      {screenMode === GAME_PAGE && <Game />}
    </React.Fragment>
  );
};

export default Page;
