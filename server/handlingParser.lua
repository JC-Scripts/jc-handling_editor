-- kanw mia lista me ola ta handling pou thelw na emfanisw sto menu
-- osa den exoun timi de ti pernaw me ti voithia tis pcall opws sto oc-stancer script
local handlingNames = {
    'fMass',
    'fInitialDragCoeff',
    'fPercentSubmerged',
    'fDownForceModifier',
    'fPopUpLightRotation',
    'fPercentSubmerged',
    'vecCentreOfMassOffset',
    'fInertiaMultiplier',
    'fDriveBiasFront',
     -- Transmission Attributes
    'fDriveInertia',
    'nInitialDriveGears',
    'fInitialDriveForce',
    'fDriveInertia',
    'fClutchChangeRateScaleUpShift',
    'fClutchChangeRateScaleDownShift',
    'fInitialDriveMaxFlatVel',
    'fBrakeForce',
    'fHandBrakeForce',
    'fBrakeBiasFront',
    'fHandBrakeForce',
    'fSteeringLock',
    -- Wheel Traction Attributes
    'fTractionCurveMax',
    'fTractionCurveMin',
    'fTractionCurveLateral',
    'fTractionSpringDeltaMax',
    'fLowSpeedTractionLossMult',
    'fCamberStiffness',
    'fTractionBiasFront',
    'fTractionLossMult',
    -- Suspension Attributes
    'fSuspensionForce',
    'fSuspensionCompDamp',
    'fSuspensionReboundDamp',
    'fSuspensionUpperLimit',
    'fSuspensionLowerLimit',
    'fSuspensionRaise',
    'fSuspensionBiasFront',
    'fAntiRollBarForce',
    'fAntiRollBarBiasFront',
    'fRollCentreHeightFront',
    'fRollCentreHeightRear',
    'fCollisionDamageMult',
    -- Damage Attributes
    'fCollisionDamageMult',
    'fWeaponDamageMult',
    'fDeformationDamageMult',
    'fEngineDamageMult',
    'fPetrolTankVolume',
    'fOilVolume',
    'fPetrolConsumptionRate',
    -- Miscellaneous Attributes
    'fSeatOffsetDistX',
    'fSeatOffsetDistY',
    'fSeatOffsetDistZ',
    'nMonetaryValue',
} 

-- Function to split the file content by line
local function splitByLine(content)
    local lines = {}
    for line in content:gmatch("[^\r\n]+") do
        table.insert(lines, line)
    end
    return lines
end

-- Function to parse tags from a line
local function parseTagFromLine(line)
    local name = line:match("<(%w+)%s+")
    if name == "vecCentreOfMassOffset" or name == "vecInertiaMultiplier" then
        return
    end
    local name, value = line:match("<(%w+)%s+value=\"([%d%.]+)\"%s*/>")
    -- TriggerClientEvent('print', source, {name, value})
    return name or nil, value or nil -- Return nil if the tag is not found
end

function truncateToDecimals(number, decimals)
    local power = 10^decimals
    return math.floor(number * power) / power
end

RegisterNetEvent('jc-handling_editor:server:getVehicleHandlings', function(vehicleName)

    -- Load the handling.meta file
    local metaFilePath = "handlings/carHandlings.meta"
    local metaData = LoadResourceFile(GetCurrentResourceName(), metaFilePath)

    if not metaData then
        TriggerClientEvent('print', source, "Error: Unable to read the handling.meta file!")
        return
    else
        TriggerClientEvent('print', source, "Handling file loaded")
    end
    --print(metaData)
    --Parse and print handling data
    --local handlingData = parseHandlingData(metaData)

    local cHandlingDataPattern = '<Item type="CHandlingData">(.-)</Item>'
    local handlingRequested = nil

    for handlingBlock in metaData:gmatch(cHandlingDataPattern) do
        local lines = splitByLine(handlingBlock)


        for _, line in ipairs(lines) do
            for startTag, value, _ in line:gmatch("<(%w+)>(.-)</(%w+)>") do
                if startTag == "handlingName" then
                    TriggerClientEvent('print', source, {value, vehicleName})
                    if string.lower(value) == string.lower(vehicleName) then
                        handlingRequested = handlingBlock
                        break
                    end
                end
            end
        end
    end

    if handlingRequested == nil then
        TriggerClientEvent('print', source, "Error: Handling not found!")
        return
    else
        local lines = splitByLine(handlingRequested)
        local vehicleHandlings = {}
        for _, line in ipairs(lines) do
            if line:match("<SubHandlingData>") then
                break
            end
            local name, value = parseTagFromLine(line)
            if name ~= nil and value ~= nil then
                value = truncateToDecimals(value, 2)
                table.insert(vehicleHandlings, {name = name, value = value})
            end
        end
        --for i, handling in ipairs(vehicleHandlings) do
        --    TriggerClientEvent('print', source, handling)
        --end
        TriggerClientEvent('print', source, "ksekinaw callback apo server")
        TriggerClientEvent('jc_handling_editor:client:handlingFileParsed', source, vehicleHandlings)
   
    end 
end)




