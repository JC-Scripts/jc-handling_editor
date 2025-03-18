local dataReceived = false
local parsedItems = nil
local nuiIsOpened = false

local function toggleNuiFrame(shouldShow)
  SetNuiFocus(shouldShow, shouldShow)
  SendReactMessage('setVisible', shouldShow)
  print(SetNuiFocusKeepInput(shouldShow))
  SetNuiFocusKeepInput(shouldShow)
  nuiIsOpened = shouldShow
end

  
RegisterCommand('+show-nui', function()
  toggleNuiFrame(true)
end)

RegisterCommand('+hide-Nui', function()
  toggleNuiFrame(false)
end)

RegisterNUICallback('hideFrame', function(_, cb)
  toggleNuiFrame(false)
  debugPrint('Hide NUI frame')
  cb({})
end)

RegisterKeyMapping('+show-nui', 'Show NUI Frame', 'keyboard', 'k')
RegisterKeyMapping('+hide-Nui', 'Hide NUI Frame', 'keyboard', 'l')

RegisterCommand('check', function()
  local playerId          = PlayerPedId()
  local playerVehicle     = GetVehiclePedIsIn(playerId, false) 
  for i,handling in ipairs(parsedItems) do
    print(handling.name, handling.value)
    print(GetVehicleHandlingFloat(playerVehicle, 'CHandlingData', handling.name))
  end
end)

------------------------------------------------------------------------------------------------
------------------------------------- NUI Callbacks --------------------------------------------
---
---
---
--- Katigoriopoihsh twn Handling Data se int float fields
--- 
--- 
function roundToDecimals(num, decimals)
  local power = 10^decimals
  return math.floor(num * power + 0.5) / power
end

local function changeHandlings(vehicle, name, value)
  SetVehicleUseAlternateHandling(vehicle, true)
  if name == "vecCentreOfMassOffsetX" or name == "vecCentreOfMassOffsetY" or name == "vecCentreOfMassOffsetZ" or name == "vecInertiaMultiplierX" or name == "vecInertiaMultiplierY" or name == "vecInertiaMultiplierZ" then
    return
  end
  if name == "nInitialDriveGears" or name == "nMonetaryValue" then
    SetVehicleHandlingInt(vehicle, 'CHandlingData', name, value)
    return
  end
  SetVehicleHandlingField(vehicle, 'CHandlingData', name, roundToDecimals(value, 2))
  --print("---------------------")
  --print(GetVehicleHandlingFloat(vehicle, 'CHandlingData', name))
  --print("---------------------")
end

--Register the event to handle the server's response
RegisterNetEvent('jc_handling_editor:client:handlingFileParsed', function(data)
  parsedItems = data -- Store the data in a global variables
  dataReceived = true -- Set flag to indicate data has been received
end)

RegisterNuiCallback('getCurrentCar', function(data, cb)
  print('Data sent by React', json.encode(data))
  local playerId          = PlayerPedId()
  local playerVehicle     = GetVehiclePedIsIn(playerId, false) 
  local playerVehicleName = GetDisplayNameFromVehicleModel(GetEntityModel(playerVehicle))
  print(playerVehicle)
  if playerVehicle <= 0 then
    cb("CARNOTFOUND")
  end
  cb(playerVehicleName)
end)

RegisterNUICallback('getHandling', function(data, cb)
  print('Data sent by React', json.encode(data))
  -- Lets send back vehicle handlings to the React frame for use
  local playerId          = PlayerPedId()
  local playerVehicle     = GetVehiclePedIsIn(playerId, false) 
  local playerVehicleName = GetDisplayNameFromVehicleModel(GetEntityModel(playerVehicle))
  print("to allagmeno oxima einai: ", playerVehicleName)
  if playerVehicle <= 0 then
    return
  end

  TriggerServerEvent('jc-handling_editor:server:getVehicleHandlings', playerVehicleName) -- Request the handling file from the server
  print("perimenw ton server_script")

  while not dataReceived do
    print("perimenw")
    Wait(200)
  end

  dataReceived = false -- Reset flag for next time
  print("sto callback")
  cb({data = parsedItems, name = playerVehicleName})
end)


RegisterNuiCallback('setHandling', function(data, cb)
  print('Data sent by React', json.encode(data))
  
  local playerId          = PlayerPedId()
  local playerVehicle     = GetVehiclePedIsIn(playerId, false) 
  if playerVehicle <= 0 then
    return
  end
  --print("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
  --print(data.name, data.value)
  changeHandlings(playerVehicle, data.name, data.value)
  cb(data.value)
end)

------------------------------------------------------------------------------------------------
--
RegisterNetEvent("print", function(message)
  print(json.encode(message))
end)


Citizen.CreateThread(function()
  while true do
    Citizen.Wait(0)
    if nuiIsOpened then

       -- Disable looking around
       DisableControlAction(0, 1, true)  -- LookLeftRight
       DisableControlAction(0, 2, true)  -- LookUpDown

       -- Disable player weapon use
       DisableControlAction(0, 24, true) -- Attack

       -- Allow vehicle movement controls
       EnableControlAction(0, 71, true)  -- Vehicle Accelerate
       EnableControlAction(0, 72, true)  -- Vehicle Brake
       EnableControlAction(0, 59, true)  -- Vehicle Left/Right
       EnableControlAction(0, 63, true)  -- Vehicle Turn Left
       EnableControlAction(0, 64, true)  -- Vehicle Turn Right
       EnableControlAction(0, 75, true)  -- Vehicle Handbrake
    end
  end 
end)
