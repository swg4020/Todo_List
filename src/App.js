import { Box, Container, Heading, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function App() {
  const [todos, setTodos] = useState(() => {
    const getTodo = localStorage.getItem("todos");
    return getTodo ? JSON.parse(getTodo) : [];
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitTodo = (data) => {
    const { todo } = data;
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: todo,
        finish: false,
      },
    ]);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <Container
      maxW={"450px"}
      w={"100%"}
      h={"100vh"}
      margin={"0 auto"}
      bgColor={"gray.200"}
      padding={"150px 20px"}
    >
      <Heading>What To do</Heading>

      <Box as="form" m={"30px 0"} onSubmit={handleSubmit(onSubmitTodo)}>
        <Input
          {...register("todo", {
            require: "내용을 작성해 주세요",
          })}
          placeholder="할일을 입력해 주세요"
          borderColor={"gray.400"}
          size={"md"}
        />
      </Box>
    </Container>
  );
}

export default App;
