var imgUrl = 'images/clearance_logo.png';
// ***
// * functions
// ***
var convertImgToBase64 = function(url, callback){
	var img = new Image();
	img.onError = function() {
		alert('Cannot load image: "'+ url +'"');
	};
	img.onload = function() {
		callback(img);
	};
	img.src = url;
}

var createText = function(text, alignment, x, y, fontType, fontSize, fontName){
	return doc.alignedText(text, {align: alignment}, x, y, fontType, fontSize, fontName);
}

var createParagraphTextFromHtml = function(dom, x, y, width){
	return doc.fromHTML(dom.get(0), x, y, {'width': width });
}

var generateDocumentHeader = function(firstLine, secondLine, thirdLine, fourthLine, fifthLine, imageLeft, imageRight){
	createText(firstLine, "center", 0, 50, "normal", 12, "times");
	createText(secondLine, "center", 0, 70, "normal", 12, "times");
	createText(thirdLine, "center", 0, 90, "normal", 12, "times");
	createText(fourthLine, "center", 0, 110, "bold", 12, "times");
	createText(fifthLine, "center", 0, 130, "bold", 14, "times");
	doc.setLineWidth(1.5);
	doc.line(40, 150, 555.28, 150);
}

var generateDocumentBody = function (text, dom, y){
	createText(text, "center", 0,230, "bold", 20, "times");
	createText("Control No: __________", "right", 0,270, "normal", 12, "times");
	createText("TO WHOM IT MAY CONCERN:", "left", 0,310, "normal", 12, "times");
	createParagraphTextFromHtml(dom, y, 340, 535);
}

var generateDocumentFooter = function(nameText, descriptionText, nameX, descriptionX){
	createText(nameText, "", 370, nameX, "normal", 12, "times");
	createText(descriptionText, "", 380, descriptionX, "italic", 10, "times");
}

// ***
// * events
// ***
var createPDFForBaranggayClearance = function(imgData) {
	doc = new jsPDF("portrait", "pt");
	doc.margins = 10;
	doc.addImage(imgData, 'PNG', 35, 30, 0, 0, 'icon');
	doc.addImage(imgData, 'PNG', 460.28, 30, 0, 0, 'icon');
	generateDocumentHeader("REPUBLIC OF THE PHILIPPINES", 
						"PROVINCE OF NEGROS OCCIDENTAL", 
						"CITY OF KABANKALAN", 
						"BARANGGAY II", 
						"OFFICE OF THE PUNONG BARANGGAY");
	generateDocumentBody("BARANGGAY CLEARANCE", $("#body_baranggay_clearance"), 40);
	generateDocumentFooter("REY G. CORDERO", "Punong Barangay", 630, 640);
	string = doc.output("datauristring");
	$("#frm_print_baranggay_clearance").attr("src", string);
}

var createPDFForBaranggayBusinessClearance = function(imgData) {
	doc = new jsPDF("portrait", "pt");
	doc.addImage(imgData, 'PNG', 35, 30, 0, 0, 'icon');
	doc.addImage(imgData, 'PNG', 460.28, 30, 0, 0, 'icon');
	generateDocumentHeader("REPUBLIC OF THE PHILIPPINES", 
						"PROVINCE OF NEGROS OCCIDENTAL", 
						"CITY OF KABANKALAN", 
						"BARANGGAY II", 
						"OFFICE OF THE PUNONG BARANGGAY");
	generateDocumentBody("BARANGAY BUSINESS CLEARANCE", $("#body_baranggay_business_clearance"), 40);
	generateDocumentFooter("REY G. CORDERO", "Punong Barangay", 660, 670);
	string = doc.output("datauristring");
	$("#frm_print_baranggay_business_clearance").attr("src", string);
}

var createPDFForCerfificateOfClosure = function(imgData){
	doc = new jsPDF("portrait", "pt");
	doc.addImage(imgData, 'PNG', 35, 30, 0, 0, 'icon');
	doc.addImage(imgData, 'PNG', 460.28, 30, 0, 0, 'icon');
	generateDocumentHeader("REPUBLIC OF THE PHILIPPINES", 
						"PROVINCE OF NEGROS OCCIDENTAL", 
						"CITY OF KABANKALAN", 
						"BARANGGAY II", 
						"OFFICE OF THE PUNONG BARANGGAY");
	generateDocumentBody("CERTIFICATE OF CLOSURE", $("#body_certificate_of_closure"), 40);
	generateDocumentFooter("REY G. CORDERO", "Punong Barangay", 630, 640);
	string = doc.output("datauristring");
	$("#frm_print_certificate_of_closure").attr("src", string);
}

convertImgToBase64(imgUrl, createPDFForBaranggayClearance);
convertImgToBase64(imgUrl, createPDFForBaranggayBusinessClearance);
convertImgToBase64(imgUrl, createPDFForCerfificateOfClosure);
