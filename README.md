<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>scrapBeer</title>
        <script src="FrameWorks/jquery/jquery-3.4.1.min.js"></script>
        <style src="FrameWorks/jquery.ui/jquery-ui-1.12.1.custom/jquery-ui.css"></style>
        <script src="FrameWorks/jquery.ui/jquery-ui-1.12.1.custom/jquery-ui.js"></script>
        <script src="scrap_ingr.js"></script>
        <style>
        .ui-helper-hidden-accessible,.cont_my_liste{
            display:none;
        }
        </style>
    </head>
    <body>
        <div class="response">
            <input type="text" name="search" id="research">
            <input type="button" value="cat" onClick="checkCat()">

        </div>
        <div id="alim_caracs">
            
        </div>
        <div id="brewery"> 
                <ul id="brew">
                </ul>
        </div>
    </body>
</html>
