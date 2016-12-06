module.exports = function(io,fs){
	var galaxys = importGalaxys(fs);
	console.log("import galaxys...");
}

function importGalaxys(fs){
	return JSON.parse(fs.readFileSync("../data/init/galaxy.json"));
}