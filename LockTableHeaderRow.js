function LockDataTableHeader(container, table, header, idExtend) {

	container = container || element("table-container-div");
	table = table || element("data-table");
	header = header || element("th-header-row");

	// Lock the Top Row of a Table so it doesn't scroll out of view as the user scrolls the form.
	// This works "pretty well", but it's still experimental.  It works so long as the screen is not
	// resized, but I have an "onResize" event listener tht simply re-locks (ie, calls this function 
	// again) when the screen is resized.
	//
	// This function is designed to work with the default IDs seen here, but if you attempt to add a 
	// second table template to the page, you will need to supply a unique ID for it, and then supply
	// something to add to the ID to make it unique and distinct from the other table on the page.  I
	// usually just send "2" for idExtend. -- KLW

	idExtend = idExtend || "";
	
	if (table) {

		// if there is any previous header row, delete it before creating the new one.

		if (element("th-span-container" + idExtend)) {
			element("th-span-container" + idExtend).parentElement.removeChild(element("th-span-container" + idExtend));
		}

		var x = document.createElement("div");
		x.id = "th-span-container" + idExtend;
		x.style.padding = "0px;"
		x.style.cssFloat = "left";
		x.style.position = "fixed";
		x.style.top = container.offsetTop + "px";

		var tds = header.getElementsByTagName("th");

		
		for (i = 0; i < tds.length; i++) {

			var z = tds[i];
			var y = document.createElement("span");

			y.style.position = "absolute";
			y.style.textAlign = "center";
			y.style.backgroundColor = "#3A3A3A";
			y.style.left = z.offsetLeft-2 + "px";
			y.style.width = z.offsetWidth + "px";
			y.style.height = z.offsetHeight + "px";
			y.style.lineHeight = z.offsetHeight + "px";
			y.innerHTML = z.innerHTML;
			x.appendChild(y);


		}

		table.appendChild(x);
		header.style.visibility = "hidden";

	}

}
