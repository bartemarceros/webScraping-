/* 
   JQuery Accordion menu with 4 levels
   HTML structure to use:

   <ul id="menu">
     <li><a href="#">Sub menu heading</a>
     <ul level="1">
       <li><a href="http://site.com/">Link</a></li>
       <li><a href="http://site.com/">Link</a></li>
       <li><a href="http://site.com/">Link</a></li>
	   <li>
		   <a href="">Link</a>
		   <ul level="2">
				<li> <a href="http://site.com/">Link</a> </li>
				<li> <a href="http://site.com/">Link</a> </li>
		   </ul>
		   <a href="">Link</a>
		   <ul level="2">
				<li> <a href="http://site.com/">Link</a> </li>
				<li> <a href="http://site.com/">Link</a> </li>
		   </ul>
	   </li>		
       ...
       ...
     </ul>
     <li><a href="#">Sub menu heading</a>
     <ul level="1">
       <li><a href="http://site.com/">Link</a></li>
       <li><a href="http://site.com/">Link</a></li>
       <li><a href="http://site.com/">Link</a></li>
       ...
       ...
     </ul>
     ...
     ...
   </ul>
*/

function initAcordeon2() {
  $('#menu ul').hide();
  $('#menu ul:first').hide();
  $('#menu ol').hide();
  $('#menu ol:first').hide();
  $('#menu li a').click(
    function() {
		  var checkElement = $(this).next();

		  // se cierran los submenues de hermanos si es que hay submenu.
		  // se busca el nivel correspondiente
		  var level = parseInt(checkElement.attr('level'));
		  if(!isNaN(level)){ 
			  $('#menu ul:visible').filter('[level="'+level+'"]').slideUp('normal');
		  } 
		   
		   // si esta abierto, se cierra
		  if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
			checkElement.slideUp('normal');
			return false;
		  }
		  
		  // si esta cerrado, se abre	  
		  if((checkElement.is('ul')) && (!checkElement.is(':visible'))) { 
			checkElement.slideDown('normal');
			return false;
		  } 
      }
    );
  }
$(document).ready(function() {initAcordeon2();});