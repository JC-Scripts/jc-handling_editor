import { Container, Grid, GridItem, Text, Input, IconButton, Spinner} from "@chakra-ui/react"
import { SlCheck  } from "react-icons/sl";
import { useState, useEffect } from "react";
import { fetchNui } from "../../utils/fetchNui";
import React from "react"; 
import { useHandlingStore } from "../../store/handlingStore";


interface HandlingProps {
    name: string;
    value: number;
  }

  
const Handling: React.FC<HandlingProps> = ({ name, value }) => {

    const [inputValue, setInputValue] = useState(-99);
    const [isLoading, setIsLoading] = useState(false);
    const {updateHandlingStore} = useHandlingStore();

    useEffect(() => {
        if (inputValue == -99) {
            return;
        }
        const updateHandling = async () => {
            setIsLoading(true);
            if (isNaN(inputValue)) {
                return;
            }
            console.log("Debug:Handling.tsx: KANW SET HANDLING --")
            await fetchNui('setHandling', {name: name, value: inputValue }).then(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 300);
                updateHandlingStore({name: name, value: inputValue});
            });
            }
            updateHandling();
    }, [inputValue]);
    

    return (
        <Container 
        border="solid"
        borderWidth={2}
        borderColor={"gray.700"}
        p={1}
        mt={2}
        >
            <Grid 
                templateColumns="repeat(6, 1fr)"
                gap={4}
                alignItems={"center"}
            >
                <GridItem 
                colSpan={4}
                pl={1}
                >   
                    <Text fontSize='12' color={"white"}>{name}</Text>
                </GridItem>
                <GridItem
                colSpan={1}
                >
                    <Input
                    type="number"
                    variant="outline"
                    placeholder={value.toString()}
                    value={inputValue === -99 
                        ? value 
                        : inputValue
                    }
                    onChange={(e) => {setInputValue(e.target.valueAsNumber)}}
                    fontSize={12}
                    textAlign='center'
                    color={"gray.400"}
                    h={6}
                    w={14}
                    p={0}
                    >
                    </Input>
                </GridItem>
                <GridItem
                colSpan={1}
                pl={2}
                >
                    <IconButton
                    size="xs"
                    variant= "none"
                    aria-label="Add Handling"
                    color="green.400"
                    icon={isLoading ? <Spinner size={"xs"}/> : <SlCheck />}
                    />
                </GridItem>
            </Grid>
        </Container>
    )
    }

export default Handling
