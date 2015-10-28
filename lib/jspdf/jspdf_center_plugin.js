   (function(API){
    API.alignedText = function(txt, options, x, y, setFontType, setFontSize, setFontName) {
        options = options ||{};

        this.setFontType(setFontType);
        this.setFont(setFontName);
        this.setFontSize(setFontSize);
        if( options.align == "center" ){
            // Get current font size
            var fontSize = this.internal.getFontSize();

            // Get page width
            var pageWidth = this.internal.pageSize.width;
            txtWidth = this.getStringUnitWidth(txt)*fontSize/this.internal.scaleFactor;

            // Calculate text's x coordinate
            x = ( pageWidth - txtWidth ) / 2;
        }

        if(options.align == "right"){
            // Get current font size
            var fontSize = this.internal.getFontSize();

            // Get page width
            var pageWidth = this.internal.pageSize.width;

            // Get the actual text's width
            txtWidth = this.getStringUnitWidth(txt)*fontSize/this.internal.scaleFactor;

            x = (pageWidth - txtWidth - 40);
        }

        if(options.align == "left"){
            x = (40);
        }
        this.text(txt, x, y);
    }
})(jsPDF.API);