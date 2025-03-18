import { Container, Flex, IconButton, Spacer, Text, Tooltip } from '@chakra-ui/react'
import { useNuiEvent } from '../../hooks/useNuiEvent'
import { useVehicleStore } from '../../store/vehicleStore';
import { useHandlingStore } from '../../store/handlingStore';
import { fetchNui } from '../../utils/fetchNui';
import { MdOutlineFileUpload } from "react-icons/md";
import React from 'react';

function Editor_info() {

    interface Handling {
        name: string;
        value: number;
      }
      
      interface HandlingData {
        data: Handling[];
        name: string;
      }
    
    const { vehicleName, setVehicleName } = useVehicleStore();
    const {setHandlings} = useHandlingStore()

    useNuiEvent<string>("setVehicleName", (data: string) => setVehicleName(data));

    const fetchNewHandling = async () => {
        await fetchNui<HandlingData>('getHandling', "handling")
            .then((data) => {
                console.log("Handling data", JSON.stringify(data))
                setHandlings(data.data)
                setVehicleName(data.name)
            })
            .catch((e) => {
                console.error("Error getting handling", e.message) 
            })
    }

    return (
        <Container p={0}>
            <Flex w="100%">
                <Text pl={2} as = "b" color={"gray.300"}>Car Name : <span style={{color: "#6A9AB0"}}>{vehicleName}</span></Text>
                <Spacer />
                <Tooltip label="Load Handling" aria-label="Load Handling">
                <IconButton
                mr={2}
                icon={<MdOutlineFileUpload />}
                aria-label='Load Handling'
                onClick={fetchNewHandling}
                bg={"rgba(255, 255, 255, 0)"}
                size={"sm"}
                color={"#E1D7C6"}
                _hover={{ bg: "rgba(26, 32, 44, 0.8)", 
                        color: "#069c13"
                }}
                alignItems={"center"}
                ></IconButton>
                </Tooltip>
            </Flex>
        </Container>
  )
}

export default Editor_info
