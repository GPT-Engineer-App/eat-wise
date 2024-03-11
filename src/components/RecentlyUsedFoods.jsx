import React from "react";
import { HStack, Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";

const RecentlyUsedFoods = ({ items, onRemove }) => {
  return (
    <HStack spacing={4}>
      {items.map((item, index) => (
        <Tag size="lg" key={index} borderRadius="full">
          <TagLabel>{item.food}</TagLabel>
          <TagCloseButton onClick={() => onRemove(index)} />
        </Tag>
      ))}
    </HStack>
  );
};

export default RecentlyUsedFoods;
