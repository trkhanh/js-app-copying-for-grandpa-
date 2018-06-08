var diskspace = require('diskspace');
const fs = require('fs');
var isPluggedSDCARD = false;
var diskNameFrom = 'G';
var diskNameTo = 'D';
var dcimFolder = diskNameFrom + ':/' + 'DCIM';
var copyTarget = [];
var copyToPath = diskNameTo + ':/Luu_Tru_TranNgoc/';
var copydir = require('copy-dir');
var toFolder = '';
const readline = require('readline');

diskspace.check(diskNameFrom, function (err, result) {
	if (err || result.status === "NOTREADY") {
		//No-> Hold and wait for SD-CARD
		console.log("Chua co nhan the");
		isPluggedSDCARD = false;

	} else {
		console.log(result.status);
		isPluggedSDCARD = true;
		if (isPluggedSDCARD) {
			fs.readdir(dcimFolder, (err, files) => {
				files.forEach(file => {
					if (file.includes("CANON")) {
						copyTarget.push(dcimFolder + '/' + file);
					}
				});

				var rl = readline.createInterface({
					input: process.stdin,
					output: process.stdout,
					terminal: false
				});
				console.log('Hay nhap vao ten thu muc moi:')
				rl.on('line', function (line) {

					console.log('input:' + line);
					toFolder = line;
					copyToPath = copyToPath + toFolder;
					
					if (!fs.existsSync(copyToPath)) {
						fs.mkdirSync(copyToPath);
					}else{
						console.log(`Thu muc ${line} da ton tai xin chon cai khac`);
					}
					console.log("bat dau copy vao thu muc ~" + copyToPath);
					copyTarget.forEach(path => {
						fs.readdir(path, (err, files) => {
							if (files.length > 0 ) {
								console.log("Bat dau copy cho ~" + path);
								copydir(path, copyToPath, function (err) {
									if (err) {
										console.log(err);
									} else {
										console.log(`Copy xong cho ~${path}!!`);
									}
								});

							} else {
								// console.log(`In path: ~${path} don't have files`)
							}
						});
					});
				})



			});
		}
	};
});


