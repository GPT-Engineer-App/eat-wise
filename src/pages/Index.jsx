import React, { useState, useMemo } from "react";
import { Box, Heading, Text, Input, Stack, Container, VStack, HStack, IconButton, useToast } from "@chakra-ui/react";
import RecentlyUsedFoods from "../components/RecentlyUsedFoods";
import { FaTrash, FaPlus } from "react-icons/fa";

const Index = () => {
  const [items, setItems] = useState([]);
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState("");
  const toast = useToast();

  const handleAddItem = () => {
    if (food && calories) {
      setItems([...items, { food, calories: parseInt(calories, 10) }]);
      setFood("");
      setCalories("");
    } else {
      toast({
        title: "Error",
        description: "Please enter both food and calories.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const totalCalories = items.reduce((total, item) => total + item.calories, 0);

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6}>
        <Heading>Calorie Tracker</Heading>
        <Text>Keep track of your calorie intake.</Text>

        <Box width="full" mb={4}>
          <Text mb={2}>Recently Used Foods:</Text>
          <RecentlyUsedFoods items={items.slice(-5)} onRemove={(index) => handleDeleteItem(items.length - 5 + index)} />
        </Box>

        <HStack as="form" onSubmit={(e) => e.preventDefault()} width="full" pt={4}>
          <Input placeholder="Food item" value={food} onChange={(e) => setFood(e.target.value)} />
          <Input placeholder="Calories" type="number" value={calories} onChange={(e) => setCalories(e.target.value)} />
          <IconButton aria-label="Add food item" icon={<FaPlus />} onClick={handleAddItem} />
        </HStack>

        <Stack width="full" spacing={4}>
          {items.map((item, index) => (
            <HStack key={index} justifyContent="space-between">
              <Text>{item.food}</Text>
              <Text fontWeight="bold">{`${item.calories} cal`}</Text>
              <IconButton aria-label="Delete food item" icon={<FaTrash />} onClick={() => handleDeleteItem(index)} />
            </HStack>
          ))}
        </Stack>

        <Box pt={4}>
          <Text fontSize="xl" fontWeight="bold">
            Total Calories: {totalCalories} cal
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
