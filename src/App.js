import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Heading,
  Input,
  VStack,
  Checkbox,
  Flex,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

function App() {
  const [todos, setTodos] = useState(() => {
    const getTodo = localStorage.getItem("todos");
    //로컬에 데이터 저장소를 지정한다.
    return getTodo ? JSON.parse(getTodo) : [];
    //JSON.parse(getTodo) 제이슨 파일을 자바스크립트로 바꿔준다.
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [currentID, setCurrentID] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    //입력값이 들어오면 초기화를 해준다.
  } = useForm();

  const onSubmitTodo = (data) => {
    const { todo } = data;
    setTodos([
      ...todos,
      //기존에 객체가 있는 상태에서 새로는 객체를 이어서 붙여준다.
      //기존에 있는 배열을 까고 객체만 불러온다
      {
        id: Date.now(),
        text: todo,
        finish: false,
      },
    ]);
    reset();
    //초기화
  };

  const onChangeCheck = (id) => {
    setTodos(
      todos.map((data) =>
        data.id === id ? { ...data, finish: !data.finish } : data
      )
    );
  };

  const onClickDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    //JSON.stringify(todos) 자바스크립트 를 제이슨으로바꿔준다
  }, [todos]);

  return (
    <Container
      maxW={"450px"}
      w={"100%"}
      h={"100vh"}
      margin={"0 auto"}
      bgColor={"gray.200"}
      padding={"150px 20px"}
      // 각 스타일들을 정의 해줄수 있다.
    >
      <Heading>What To do</Heading>
      {/* 중요한 타이틀인 경우에는 Heading */}
      <Box as="form" m={"30px 0"} onSubmit={handleSubmit(onSubmitTodo)}>
        <Input
          // 차크라에서 인풋도 정의되어있다
          {...register("todo", {
            require: "내용을 작성해 주세요",
          })}
          placeholder="할일을 입력해 주세요"
          borderColor={"gray.400"}
          size={"md"}
        />
      </Box>

      <VStack>
        {/* VStack 세로로 추가된걸 정렬해준 */}
        {todos.map((data) => (
          <Checkbox
            key={data.id}
            w={"100%"}
            h={"60px"}
            bgColor={"white"}
            p={"15px"}
            size={"lg"}
            isChecked={data.finish}
            onChange={() => onChangeCheck(data.id)}
            //onChange 이벤트를 줄경우는 온체인지
          >
            <Flex>
              <Box>{data.text}</Box>
              <DeleteIcon
                onClick={() => {
                  onOpen();
                  //연결된 창을 열어주는 것으로 onOpen 과 isOpen은 서로 같이 써줘야함.
                  setCurrentID(data.id);
                  // 현재의 아이디값을 넘겨줌으로써 어떤것인지를 알려줌.
                }}
              />
              {/* 이벤트를 줘서 오픈하게 만들어줌 */}
            </Flex>
          </Checkbox>
        ))}
      </VStack>

      <AlertDialog isOpen={isOpen}>
        {/* 열릴 것에는 isOpen */}
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>삭제 확인</AlertDialogHeader>

            <AlertDialogBody>정말 삭제하시겠습니까?</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                취소
              </Button>
              <Button
                onClick={() => {
                  onClickDelete(currentID);
                  onClose();
                  //onClose는 닫기이다.
                }}
              >
                삭제
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
}

export default App;
