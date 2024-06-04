"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
// styles
import {
  CardBody,
  CardButton,
  CardImage,
  CardTitle,
  Card as MainCard,
} from "@/app/styles/home/ScreenOne.styles";
import {
  FlexContainer,
  PositionContainer,
} from "@/app/styles/shared/Container.styles";
// utils
import { screens } from "@/utils/data";

interface ITitle {
  body: string;
  selected: boolean;
  text: string;
  slug: "ETH" | "USD";
}

interface ICardProps {
  title: ITitle[];
}

const Card = ({ title }: ICardProps) => {
  const [selectedSlugState, setSelectedSlug] = useState("USD");
  const [titleState, setTitleState] = useState(title);

  const {
    home: {
      images: { ethereumIcon, usdIcon },
    },
  } = screens;

  const handleCardButtonClick = () => {
    // toggles `titleState`
    setTitleState((prevState) => {
      const updatedState = prevState.map((item) => ({
        ...item,
        selected: !item.selected,
      }));

      return updatedState;
    });
  };

  useEffect(() => {
    titleState.forEach((item) => {
      if (item.selected) {
        setSelectedSlug(item.slug);
        return item;
      }
    })!;
  }, []);

  // selected
  const { body, slug, text } = titleState.find((item) => item.selected)!;

  return (
    <MainCard>
      <CardTitle>{text}</CardTitle>
      <FlexContainer
        $flexDirection="row"
        $justifyContent="center"
        $alignItems="center"
        $width="fit-content"
      >
        <CardImage
          width={30}
          height={40}
          src={slug == "USD" ? usdIcon.src : ethereumIcon.src}
          alt=""
        />
        <CardBody>{body}</CardBody>
      </FlexContainer>
      <PositionContainer
        $position="absolute"
        $top="70px"
        $flexDirection="row"
        $justifyContent="center"
        $width="fit-content"
      >
        {titleState.map(({ slug, selected }) => (
          <CardButton
            $selected={selected}
            onClick={!selected ? handleCardButtonClick : () => {}}
          >
            {slug}
          </CardButton>
        ))}
      </PositionContainer>
    </MainCard>
  );
};

export default Card;
