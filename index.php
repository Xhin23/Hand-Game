<head>
    <title>Hand Game</title>
    <link rel="stylesheet" type="text/css" href="css/main.css" />
</head>
<body>
<div id="content">
           
   <div id="help">
       <a id="help-close" href="">X</a>
       <ul>
           <li>Hover over a finger to see which fingers it affects</li>
           <li>Click a finger to make down fingers go up and up fingers go down</li>
           <li>The goal is to make all the fingers be up at the same time</li>
       </ul>
   </div><br />
                
    <div id="info">
        <table>
        <tr><td>Score</td><td id="score">0</td></tr>
        <tr><td colspan="2" class="control"><input type="button" id="puzzle-reset" value="Reset" /></td>
        <tr><td colspan="2" class="control"><input type="button" id="puzzle-new" value="New Puzzle" /></td></tr>
        <tr><td colspan="2" class="control"><input type="button" id="puzzle-solution" value=" Show Solution " /></td></tr>
        </table>
    </div>
    
    <div id="hand-wrapper">
        
    <div id="hand">
        <div style="position: relative; z-index: 1;" finger="1">
            <img src="images/1off.png" class="finger" id="finger-1" />
            <div class="indicator" id="indicator-1" style="left: 69px; top:212px; display: none;"></div>
            <img class="solution" style="left: 71px; top: 207px; display: none;" src="images/triggers/1.png" />
        </div>
        
        <div style="left: 106px; z-index:2;" finger="2">
            <img src="images/2off.png" class="finger" id="finger-2"/>
            <div class="indicator" id="indicator-2" style="left: 27px; top:198px; display: none;"></div>
            <img class="solution" style="left: 24px; top: 190px; display: none;" src="images/triggers/2.png" />
        </div>
        
        <div style="left: 172px; z-index: 3;" finger="3">
            <img src="images/3off.png" class="finger" id="finger-3" />
            <div class="indicator" id="indicator-3" style="left: 30px; top:198px; display: none;"></div>
            <img class="solution" style="left: 28px; top: 184px; display: none;" src="images/triggers/3.png" />
        </div>
        
        <div style="left: 239px; z-index: 4;" finger="4">
            <img src="images/4off.png" class="finger" id="finger-4" />
            <div class="indicator" id="indicator-4" style="left: 16px; top:217px; display: none;"></div>
            <img class="solution" style="left: 14px; top: 208px; display: none;" src="images/triggers/4.png" />
        </div>
        
        <div style="left: 284px; z-index: 5;" finger="5">
            <img src="images/5off.png" class="finger" id="finger-5" />
            <div class="indicator" id="indicator-5" style="left: 26px; top:329px; display: none;"></div>
            <img class="solution" style="left: 24px; top: 325px; display: none;" src="images/triggers/5.png" />
        </div>
    </div>
    <img src="images/handone.png" id="handone" style="display: none;" />
    </div>
    <br />
    
    <div id="solution"></div>
    
    <div id="controls">
        <input id="puzzle-id" />
    </div>
    

</div>

<script type="text/JavaScript">
    _url = 'http://<?=$_SERVER['HTTP_HOST']?><?=$_SERVER['PHP_SELF']?>';
</script>

<script type="text/JavaScript" src="js/jquery.js"></script>
<script type="text/JavaScript" src="js/twister.js"></script>
<script type="text/JavaScript" src="js/main.js"></script>

<script type="text/JavaScript">
    <?php if ($_GET['seed']) { ?>
        rules.seed(<?=$_GET['seed']?>);
        game.set_seed();
    <?php } ?>
</script>
</body>