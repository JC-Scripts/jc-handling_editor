fx_version "cerulean"

description "A Vehicle Handling Editor for FiveM"
author "JC Scripts"
version '1.0.0'
repository ''

lua54 'yes'

games {
  "gta5",
  "rdr3"
}

ui_page 'web/build/index.html'

client_script "client/**/*"
server_script "server/**/*"

exports {
  'getVehicleHandlings'
}

files {
	'web/build/index.html',
	'web/build/**/*',
  'handlings/carHandlings.meta'
}

data_file 'HANDLING_FILE' 'handlings/carHandlings.meta'