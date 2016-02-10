var tbStyle = new Array('tableContent1Alup', 'tableContent2Alup');
var tbStyleDtls = new Array('tableContent1', 'tableContent2');
var wpTableList = new Array(16);
var ranRace = 0;
var ranGenFlag = 0;
var arrSize = 25;
//var winOddsTableDisplay = false;
//var winOddsTableNo = 0;
function horse(horseNo, winOdd, color) {
    this.horseNo = horseNo;
    this.winOdds = winOdds;
    this.color = color;
    console.log(this.horseNo);
}

function unloadRacingComponent() {
    try {
        tbStyle = null;
        for (var i = 0; i < wpTableList.length; i++) wpTableList[i] = null;
        wpTableList = null;
    } catch (ex) {}
}

function resetRanGenFlag() {
    ranGenFlag = 0;
}

function BetObject() {
    this.pool;
    this.bankerNo = 0;
    this.legNo = 0;
    this.bankerBuf = new StringBuffer();
    this.legBuf = new StringBuffer();
    this.toBetSel = function() {
        if (this.bankerNo == 0) return this.legBuf.toString();
        return this.bankerBuf.toString() + '>' + this.legBuf.toString();
    }
}

function NoveltyBetObject() {
    this.pool;
    this.legNo = 0;
    this.legBuf = new StringBuffer();
    this.toBetSel = function() {
        return this.legBuf.toString();
    }
}

function RacingTableObj() {
    this.num = '';
    this.hName = '';
    this.hCode = '';
    this.hStat = '';
    this.hScr = '';
    this.jName = '';
    this.jCode = '';
    this.tName = '';
    this.tCode = '';
    this.brand = '';
    this.draw = '';
    this.handicap = '';
};

function isAllReserve(horseStats) {
    var sCount = 0;
    var rCount = 0;
    for (var i = 0; i < horseStats.length; i++) {
        if (horseStats[i].indexOf('S') >= 0) sCount++;
        else if (horseStats[i].indexOf('R') >= 0) rCount++;
    }
    if (rCount == horseStats.length) return true;
    if (rCount > 0 && rCount + sCount == horseStats.length) return true;
    return false;
}

function isBracketReserveOrScratch(tbObj) {
    var sCount = 0;
    var rCount = 0;
    for (var i = 0; i < tbObj.length; i++) {
        if (tbObj[i].hStat.indexOf('S') >= 0) sCount++;
        else if (tbObj[i].hStat.indexOf('R') >= 0) rCount++;
    }
    if (rCount == tbObj.length) return true;
    if (rCount > 0 && rCount + sCount == tbObj.length) return true;
    return false;
}

function isAllBracketReserve(tbObj) {
    var rCount = 0;
    for (var i = 0; i < tbObj.length; i++) {
        if (tbObj[i].hStat.indexOf('R') >= 0) rCount++;
    }
    if (rCount == tbObj.length) return true;
    return false;
}

function isRaceAllRunnersReserve(rNo) {
    for (var i = 1; i < horseStats[rNo].length; i++) {
        var tmp = horseStats[rNo][i].split('/');
        for (var j = 0; j < tmp.length; j++) {
            if (tmp[j].indexOf('R') < 0) return false;
        }
    }
    return true;
}
///////////////////////////////////////////////////
// Simple WP Table
///////////////////////////////////////////////////
function RacingWPTable(rNo) {
    this.raceNo = rNo;
    this.startSell = 0;
    this.sellStatus = '';
    this.firstLeg = -1;
    this.singleRace = false;
    this.id = '';
    this.tableId = '';
    this.divId = '';
    this.box1 = '';
    this.box2 = '';
    this.dropdownDisplay = false;
    this.dropdownValue; // array
    this.dropdownText; // array
    this.enableBanker = true;
    this.enablePla = false;
    this.enableField = true;
    this.fieldSize = 14;
    this.tableSize = 14;
    this.tableObj = new Array(arrSize);
    this.selectPool = '';
    this.selectBanker = new Array(arrSize);
    this.selectLeg = new Array(arrSize);
    this.selectLegField = 0;
    this.winOdds = new Array(arrSize);
    this.winColorInd = new Array(arrSize);
    this.plaOdds = new Array(arrSize);
    this.plaColorInd = new Array(arrSize);
    this.rowHeights = new Array(arrSize);
    this.lblChoosePool = '';
    this.lblHorseNum = '';
    this.lblBanker = '';
    this.lblLeg = '';
    this.lblSel = '';
    this.lblHorseName = '';
    this.lblWin = '';
    this.lblPla = '';
    this.lblField = '';
    this.enableBorder = true;
    this.isTableLayoutFixed = false; // for tt
    this.colWidth = []; // for tt
    this.noOfReserveHorse = 0;
    this.showHorseNum = true;
    this.showHorseName = true;
    this.showOdd = true;
    this.force2ShowFieldRow = false;
    this.horseNameWidthUnbound = false;
    /////// CWIN
    this.cwinOpt = new Array(); // array to store all composite of all races
    this.cwinStarters = new Array(); // array to store all starters of composite of all races
    this.cwinOdds = new Array(arrSize); // array to store all odds of all races
    this.cwinGroups = new Array(arrSize);
    this.cwinColorInd = new Array(arrSize);
    //this.winColorInd2 = new Array(arrSize);
    this.cwinPoolTitle = new Array();
    this.cwinScr = new Array();
    this.cwinHasGroupName = false;
    this.lblComposite = '';
    this.lblStartersInclude = '';
    this.lblOdds = '';
    this.lblCompSel = '';
    this.clearCheckBox = function() {
        for (var i = 0; i < this.selectLeg.length; i++) {
            this.selectBanker[i] = 0;
            this.selectLeg[i] = 0;
        }
        this.selectLegField = 0;
    }
    this.clearBankerCheckBox = function() {
        for (var i = 0; i < this.selectLeg.length; i++) {
            this.selectBanker[i] = 0;
        }
    }
    this.clearWinOdds = function() {
        for (var i = 1; i < 25; i++) {
            this.winOdds[i] = '';
            this.winColorInd[i] = 0;
            //this.winColorInd2[i] = 0;
        }
    }
    this.clearPlaOdds = function() {
        for (var i = 1; i < 25; i++) {
            this.plaOdds[i] = '';
            this.plaColorInd[i] = 0;
        }
    }
    this.clearCWinOdds = function() {
        for (var i = 0; i < this.cwinOpt.length; i++) {
            this.cwinOdds[this.cwinOpt[i]] = '';
            this.cwinColorInd[this.cwinOpt[i]] = 0;
        }
    }
    this.createBetObject = function(pool) {
        var betObj = new BetObject();
        var poolD = pool;
        if (isCwin(pool)) {
            pool = "CWIN";
        }
        for (var i = 0; i < this.selectLeg.length; i++) {
            if (this.selectBanker[i] == 1) {
                if (betObj.bankerNo > 0) betObj.bankerBuf.append('+');
                betObj.bankerBuf.append(i);
                betObj.bankerNo++;
            }
            if (this.selectLeg[i] == 1) {
                if (pool == "CWIN") {
                    if (poolD.charAt(2) == this.cwinOpt[i].charAt(0)) {
                        if (betObj.legNo > 0) betObj.legBuf.append('+');
                        betObj.legBuf.append(this.cwinOpt[i]);
                        betObj.legNo++;
                    }
                } else {
                    if (betObj.legNo > 0) betObj.legBuf.append('+');
                    betObj.legBuf.append(i);
                    betObj.legNo++;
                }
            }
        }
        // Field
        if (this.selectLegField == 1) {
            if (betObj.legNo > 0) betObj.legBuf.append('+');
            betObj.legBuf.append('F');
            betObj.legNo = 24; // must be greatest
        }
        return betObj;
    }
    this.updateRowHeights = function() {
        var tb1 = document.getElementById(this.id + 'InnerTable');
        if (tb1 != null) {
            var trs1 = tb1.getElementsByTagName('tr');
            for (var i = 0; i < trs1.length; i++) this.rowHeights[i] = trs1[i].offsetHeight;
        }
    }
    this.setInnerTableHtml = function() {
        if (document.getElementById(this.id + 'InnerTable') != null) {
            document.getElementById(this.id + 'InnerTable').innerHTML = this.generateInnerTable();
        }
        try {
            syncTableRowHeight();
        } catch (e) {}
        setTimeout('wpTableList[' + this.raceNo + '].updateRowHeights()', 100);
        /*
        $('.winOddsLink').unbind("click");
        $('.winOddsLink').click(function(e) {
            e.stopPropagation();
            winOddsTableDisplay = true;
            winOddsTableNo = this.id.replace('winOddsLink', '');
            $("#winOddsHolder").show();
        });
        */
    }
    this.generateTable = function() {
        var buf = new StringBuffer();
        buf.append('<table height="100%" cellSpacing="0" cellPadding="0" width="100%" border="0">');
        // box1
        if (this.box1 != '') {
            buf.append('<tr><td class="titleBar" nowrap>');
            buf.append(this.box1);
            buf.append('</td></tr>');
        }
        // box2
        if (this.box2 != '') {
            buf.append('<tr><td class="subTitleBar">');
            buf.append(this.box2);
            buf.append('</td></tr>');
        }
        // dropdownlist
        if (this.dropdownValue != null && this.dropdownValue.length > 0) {
            buf.append('<tr');
            if (!this.dropdownDisplay) buf.append(' style="display:none;"');
            buf.append('>');
            buf.append('<td class="whiteBar">');
            buf.append(this.lblChoosePool);
            buf.append('<select onchange="').append('poolBoxChange(\'').append(this.divId).append('\', ').append(this.tableId).append(', this.value);" class="select2" style="WIDTH:' + ((pageLang == "en") ? 130 : 125) + 'px">');
            for (var i = 0; i < this.dropdownValue.length; i++) {
                if (isCwin(this.dropdownValue[i])) {
                    if (cwAlupAllowed) {
                        buf.append('<option value="').append(this.dropdownValue[i]).append('"');
                        buf.append((this.selectPool == this.dropdownValue[i]) ? "selected" : "");
                        buf.append('>').append(this.cwinPoolTitle[this.dropdownValue[i]] + ' *').append('</option>');
                    }
                } else {
                    buf.append('<option value="').append(this.dropdownValue[i]).append('"');
                    buf.append((this.selectPool == this.dropdownValue[i]) ? "selected" : "");
                    buf.append('>').append(this.dropdownText[i]).append('</option>');
                }
            }
            buf.append('</select>').append('</td></tr>');
        }
        buf.append('</table>');
        buf.append('<div id="').append(this.id).append('InnerTable"></div>');
        document.getElementById(this.divId).innerHTML = buf.toString();
    };
    this.getLegName = function(poolName) {
        var legName = '';
        switch (poolName) {
            case 'WIN':
            case 'PLA':
            case 'W-P':
            case 'DBL':
            case 'TBL':
            case '6UP':
                legName = this.lblSel;
                break;
            default:
                legName = this.lblLeg;
                break;
        }
        return legName;
    };
    this.bubbleSort = function(a) {
        var swapped;
        do {
            swapped = false;
            for (var i = 0; i < a.length - 1; i++) {
                if (a[i] > a[i + 1]) {
                    var temp = a[i];
                    a[i] = a[i + 1];
                    a[i + 1] = temp;
                    swapped = true;
                }
            }
        } while (swapped);
    }
    this.clone = function(obj) {
        if (obj == null || typeof(obj) != 'object') return obj;
        var temp = new obj.constructor();
        for (var key in obj) temp[key] = this.clone(obj[key]);
        return temp;
    }
    this.generateInnerTable = function() {
        /*
        if (winOddsTableDisplay && winOddsTableNo == this.raceNo) {
        $('#winOdds').html(getWinOddsTable(this));
        }        */
        var buf = new StringBuffer();
        if (this.selectPool == "CWA") {
            var specialPoolStyle = "";
            var noOfCol = 5;
            // some field follow first leg         ///////
            if (this.firstLeg > 0 && this.firstLeg != this.raceNo) this.sellStatus = wpTableList[this.firstLeg].sellStatus;
            // horseTable
            buf.append('<table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #CCCCCC;">'); //table-layout:fixed
            //buf.append('<col width="' + ((pageLang == "en") ? 61 : 30) + 'px"/>');
            buf.append('<colgroup>');
            if (pageLang == 'ch') {
                buf.append('<col width="27px"/>');
                buf.append('<col width="27px"/>');
                //buf.append('<col width="20px" />');
                if (this.cwinHasGroupName) {
                    buf.append('<col width="27px"/>');
                } else {
                    noOfCol = 4;
                }
            } else {
                buf.append('<col/>');
                buf.append('<col/>');
                if (this.cwinHasGroupName) {
                    buf.append('<col/>');
                } else {
                    noOfCol = 4;
                }
            }
            buf.append('<col/>');
            buf.append('<col width="30px" />');
            buf.append('</colgroup>');
            buf.append('<tr>');
            buf.append('<td colspan="' + noOfCol + '" class="titleBar">').append('<span style="width: 100%; word-wrap: break-word;">' + this.cwinPoolTitle[this.selectPool] + ' *</span>');
            buf.append('</td>');
            buf.append('</tr>');
            buf.append('<tr>');
            /*
            if (this.showHorseNum)
            buf.append('<td class="tableContentHeadAlup" style="BORDER-BOTTOM:#cccccc 1px solid" align="center" valign="top" nowrap></td>');
            if (enableBS) {
            buf.append('<td class="tableContentHeadAlup" style="BORDER-BOTTOM:#cccccc 1px solid" align="center" valign="top"  nowrap>').append(this.lblSel).append('</td>');
            }
            */
            buf.append('<td class="tableContentHeadAlup" style="BORDER-BOTTOM:#cccccc 1px solid" align="center" valign="top" nowrap colspan="2">').append(this.lblCompSel).append('</td>');
            if (this.showHorseName) {
                if (this.cwinHasGroupName) buf.append('<td class="tableContentHeadAlup" style="BORDER-BOTTOM:#cccccc 1px solid" nowrap align="center" valign="top" >').append('&nbsp;').append('</td>');
                buf.append('<td class="tableContentHeadAlup" style="BORDER-BOTTOM:#cccccc 1px solid" align="center" valign="top" >').append(this.lblStartersInclude).append('</td>');
            }
            if (this.showOdd) {
                buf.append('<td class="tableContentHeadAlup" style="BORDER-BOTTOM:#cccccc 1px solid" align="center" width="30" valign="top"  nowrap>').append(this.lblOdds).append('</td>');
            }
            buf.append('</tr>');
            var rowCount = 0;
            for (var i = 0; i < this.cwinOpt.length; i++) {
                // horse num
                if (this.cwinOpt[i] != undefined && this.cwinOpt[i].charAt(0) == this.selectPool.charAt(2)) {
                    rowCount++;
                    buf.append('<tr>');
                    buf.append('<td valign="top"  align="center" class="').append(tbStyle[rowCount % 2]).append(" c_info_cell").append('" style="padding-left:1px;padding-right:1px;line-height:16px;').append(this.enableBorder ? 'border-left:1px solid #CCCCCC' : '').append('"><nobr>').append(this.cwinOpt[i]);
                    buf.append('</nobr></td>');
                    if (enableBS) {
                        // leg box
                        var disabled = ranRace >= this.raceNo || this.startSell == 0 || this.sellStatus.indexOf(this.selectPool) < 0 || this.cwinOdds[this.cwinOpt[i]] == "SCR" || this.cwinOdds[this.cwinOpt[i]] == "---" || this.cwinScr[this.cwinOpt[i]];
                        if (disabled) this.selectLeg[i] = 0;
                        buf.append('<td valign="top"  class="').append(tbStyle[rowCount % 2]).append(" legCheckbox").append('" align="center"');
                        buf.append((this.selectLeg[i] == 1) ? ' style="background-color: #FFF4B0"' : '');
                        buf.append('>');
                        buf.append('<input type="checkbox" class="checkbox" onclick="legClick(\'').append(this.divId).append('\', ').append(this.tableId).append(', ').append(i).append(');" ');
                        buf.append((this.selectLeg[i] == 1) ? 'checked ' : '');
                        buf.append(disabled ? 'disabled' : '').append('>');
                        buf.append('</td>');
                    }
                    // horse name
                    if (this.cwinHasGroupName) {
                        buf.append('<td valign="top"  class="').append(tbStyle[rowCount % 2]).append(" c_info_cell").append('">');
                        buf.append('<span style="word-wrap: break-word;">' + this.cwinGroups[this.cwinOpt[i]] + '</span>');
                        buf.append('</td>');
                    }
                    // horse num
                    buf.append('<td valign="top"  class="').append(tbStyle[rowCount % 2]).append(" c_info_cell").append('">');
                    for (var j = 0; j < this.cwinStarters[this.cwinOpt[i]].length; j++) {
                        if (j > 0) {
                            buf.append(', ');
                        }
                        buf.append(this.cwinStarters[this.cwinOpt[i]][j]);
                        var tempStarter = this.cwinStarters[this.cwinOpt[i]][j];
                        //for (var k = 0; k < this.tableObj[tempStarter].length; k++) {
                        if (isAllBracketReserve(this.tableObj[tempStarter])) {
                            buf.append('(').append(reserveLbl).append(')');
                        }
                        if (this.tableObj[tempStarter][0].hScr == '1' || this.winOdds[tempStarter] == 'SCR') {
                            buf.append('(').append(this.lblScr).append(')');
                        }
                        //}
                    }
                    buf.append('</td>');
                    // prevent showing hf when ---
                    if (!isNumericDash(this.cwinOdds[this.cwinOpt[i]])) this.cwinColorInd[this.cwinOpt[i]] = 0;
                    if (this.showOdd) {
                        // cwin odds
                        buf.append('<td valign="top"  class="').append(tbStyle[rowCount % 2]).append(" c_info_cell").append('" align="center" style="').append((this.enableBorder && !this.enablePla) ? 'border-right:1px solid #CCCCCC' : '').append('">');
                        if (this.cwinOdds[this.cwinOpt[i]] == 'SCR') buf.append('<nobr>').append(scratchLbl).append('</nobr>')
                        else {
                            if (ranRace >= this.raceNo || this.startSell == 0 || this.sellStatus.indexOf(this.selectPool) < 0 || this.cwinScr[this.cwinOpt[i]]) {
                                buf.append('<span style="color:').append(getOddsFgColor(this.cwinColorInd[this.cwinOpt[i]])).append(';background-color:').append(getOddsBgColor(this.cwinColorInd[this.cwinOpt[i]])).append('">').append(this.cwinOdds[this.cwinOpt[i]]).append('</span>');
                            } else {
                                buf.append('<a style="color:').append(getOddsFgColor(this.cwinColorInd[this.cwinOpt[i]])).append(';background-color:').append(getOddsBgColor(this.cwinColorInd[this.cwinOpt[i]])).append('" href="javascript:processQuickBet(\'' + this.selectPool + '\', \'' + this.raceNo + '\',\'' + this.cwinOpt[i] + '\')">').append(this.cwinOdds[this.cwinOpt[i]]).append('</a>');
                            }
                        }
                        buf.append('</td>');
                    }
                    buf.append('</tr>');
                }
            }
            buf.append('</table>');
            // win odds table
            buf.append('<div style="height: 5px; display: block; clear: both; overflow: hidden;">&nbsp</div>');
            buf.append(getWinOddsTable(this));
        } else {
            var specialPoolStyle = "";
            this.noOfReserveHorse = 0;
            if (this.selectPool == 'QTT' || this.selectPool == 'TCE') {
                specialPoolStyle = " nopadding";
            }
            // some field follow first leg
            if (this.firstLeg > 0 && this.firstLeg != this.raceNo) this.sellStatus = wpTableList[this.firstLeg].sellStatus;
            // horseTable
            if (this.isTableLayoutFixed) {
                buf.append('<table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #CCCCCC;table-layout:fixed">');
            } else {
                buf.append('<table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #CCCCCC;">');
            }
            buf.append('<tr>');
            if (this.showHorseNum) buf.append('<td class="tableContentHeadAlup" style="BORDER-BOTTOM:#cccccc 1px solid" align="center" nowrap>').append(this.lblHorseNum).append('</td>');
            if (enableBS) {
                if (this.enableBanker) buf.append('<td class="tableContentHeadAlup" style="BORDER-BOTTOM:#cccccc 1px solid" align="center" nowrap>').append(this.lblBanker).append('</td>');
                buf.append('<td class="tableContentHeadAlup" style="BORDER-BOTTOM:#cccccc 1px solid" align="center" nowrap>').append(this.getLegName(this.selectPool)).append('</td>');
            }
            if (this.showHorseName) buf.append('<td class="tableContentHeadAlup" style="BORDER-BOTTOM:#cccccc 1px solid" nowrap>').append(this.lblHorseName).append('</td>');
            if (this.showOdd) {
                buf.append('<td class="tableContentHeadAlup" style="BORDER-BOTTOM:#cccccc 1px solid" align="center" nowrap>').append(this.lblWin).append('</td>');
                if (this.enablePla) buf.append('<td class="tableContentHeadAlup" style="BORDER-BOTTOM:#cccccc 1px solid" align="center" nowrap>').append(this.lblPla).append('</td>');
            }
            buf.append('</tr>');
            for (var i = 1; i <= this.fieldSize; i++) {
                buf.append('<tr>');
                // horse num
                if (this.showHorseNum) {
                    buf.append('<td align="center" class="').append(tbStyle[i % 2]).append(" info_cell").append('" style="padding-left:1px;padding-right:1px;line-height:16px;').append(this.enableBorder ? 'border-left:1px solid #CCCCCC' : '').append('"><nobr>').append(i);
                    if (isAllBracketReserve(this.tableObj[i])) {
                        buf.append('(').append(reserveLbl).append(')');
                        this.noOfReserveHorse++;
                    }
                    buf.append('</nobr></td>');
                }
                if (enableBS) {
                    // banker box
                    if (this.enableBanker) {
                        var disabled = this.tableObj[i][0].hName == '' || this.tableObj[i][0].hScr == '1' || ranRace >= this.firstLeg || this.startSell == 0 || this.sellStatus.indexOf(this.selectPool) < 0 || isBracketReserveOrScratch(this.tableObj[i]);
                        if (disabled) this.selectBanker[i] = 0;
                        buf.append('<td class="').append(tbStyle[i % 2]).append(" bankerCheckbox").append('" align="center"');
                        buf.append((this.selectBanker[i] == 1) ? ' style="background-color: #FFF4B0"' : '');
                        buf.append('>');
                        buf.append('<input type="checkbox" class="checkbox" onclick="bankerClick(\'').append(this.divId).append('\', ').append(this.tableId).append(', ').append(i).append(');" ');
                        buf.append((this.selectBanker[i] == 1) ? 'checked ' : '');
                        buf.append(disabled ? 'disabled' : '').append('>');
                        buf.append('</td>');
                    }
                    // leg box  
                    var disabled = this.selectLegField == 1 || this.tableObj[i][0].hName == '' || this.tableObj[i][0].hScr == '1' || ranRace >= this.firstLeg || this.startSell == 0 || this.sellStatus.indexOf(this.selectPool) < 0 || isBracketReserveOrScratch(this.tableObj[i]);
                    if (disabled) this.selectLeg[i] = 0;
                    buf.append('<td class="').append(tbStyle[i % 2]).append(" legCheckbox").append(specialPoolStyle).append('" align="center"');
                    buf.append((this.selectLeg[i] == 1) ? ' style="background-color: #FFF4B0"' : '');
                    buf.append('>');
                    buf.append('<input type="checkbox" class="checkbox" onclick="legClick(\'').append(this.divId).append('\', ').append(this.tableId).append(', ').append(i).append(');" ')
                    buf.append((this.selectLeg[i] == 1) ? 'checked ' : '');
                    buf.append(disabled ? 'disabled' : '').append('>');
                    buf.append('</td>');
                }
                // horse name
                if (this.showHorseName) {
                    buf.append('<td class="').append(tbStyle[i % 2]).append(" info_cell")
                    if (this.horseNameWidthUnbound) buf.append('" ><div class="divWinHorseName0">');
                    else if (this.enableBanker) buf.append('" ><div class="divWinHorseName2">');
                    else buf.append('" ><div class="divWinHorseName1">');
                    for (var j = 0; j < this.tableObj[i].length; j++) {
                        if (j > 0) buf.append('<br>');
                        if (!isOverseaMeeting)
                        // START Nielsen Online SiteCensus
                        //buf.append('<a href="javascript:goHorseRecord2(\'').append(jcewUrlLbl).append('\', \'').append(this.tableObj[i][j].hCode).append('\');">');
                            buf.append('<a href="javascript:WACommonTagging(\'horse\');goHorseRecord2(\'').append(jcewUrlLbl).append('\', \'').append(this.tableObj[i][j].hCode).append('\');">');
                        // END Nielsen Online SiteCensus
                        if (isOverseaMeeting && this.tableObj[i][j].hCode != '') buf.append('(').append(this.tableObj[i][j].hCode).append(')');
                        if (this.tableObj[i][j].hName != '') buf.append('<span class="hkscsfontfamily">').append(this.tableObj[i][j].hName).append('</span>');
                        else buf.append('-');
                        if (!isOverseaMeeting) buf.append('</a>');
                        if (!isAllBracketReserve(this.tableObj[i]) && this.tableObj[i][j].hStat.indexOf('R') >= 0) buf.append('<nobr>(').append(reserveLbl).append(')</nobr>');
                        if (isOverseaMeeting && this.tableObj[i][j].hStat.indexOf('S') >= 0) buf.append('<nobr>(').append(scratchLbl).append(')</nobr>');
                    }
                    buf.append('</div></td>');
                }
                // prevent showing hf when ---
                if (!isNumericDash(this.winOdds[i])) this.winColorInd[i] = 0;
                if (this.showOdd) {
                    // win odds
                    buf.append('<td class="').append(tbStyle[i % 2]).append(" info_cell").append('" align="center" style="').append((this.enableBorder && !this.enablePla) ? 'border-right:1px solid #CCCCCC' : '').append('">');
                    if (this.winOdds[i] == '---') buf.append('<span class="wpTdColor"><nobr>---</nobr></span>');
                    else if (this.winOdds[i] == 'SCR' || this.tableObj[i][0].hScr == '1') buf.append('<nobr>').append(scratchLbl).append('</nobr>')
                    else if (isBracketReserveOrScratch(this.tableObj[i])) buf.append('<span class="wpTdColor"><nobr>---</nobr></span>');
                    else if (this.winOdds[i] != null && ranRace < this.firstLeg && this.startSell == 1 && this.sellStatus.indexOf('WIN') >= 0) buf.append('<a class="wpTdColor" style="color:').append(getOddsFgColor(this.winColorInd[i])).append(';background-color:').append(getOddsBgColor(this.winColorInd[i])).append('" href="javascript:processQuickBet(\'WIN\', \'' + this.raceNo + '\', ' + i + ')">' + this.winOdds[i] + '</a>');
                    else buf.append('<span class="wpTdColor" style="color:').append(getOddsFgColor(this.winColorInd[i])).append(';background-color:').append(getOddsBgColor(this.winColorInd[i])).append('">').append(this.winOdds[i]).append('&nbsp</span>');
                    buf.append('</td>');
                    //test
                    var sortedWinOdds = this.clone(this.winOdds);
                    sortedWinOdds.sort(function (a, b){
                      console.log(this.winOdds);
                      console.log(sortedWinOdds);
                      console.log(a + " -  " + b);
                      return a - b;
                    });

                    console.log('====================================');

                    var colorArray = ['', 'red', 'orange', 'yellow', 'green', '#44F5E8', 'blue'];

                    //test
                    // place odds
                    if (this.enablePla) {
                        if (!isNumericDash(this.plaOdds[i])) this.plaColorInd[i] = 0;
                        buf.append('<td class="').append(tbStyle[i % 2]).append(" info_cell").append('" align="center" style="').append(this.enableBorder ? 'border-right:1px solid #CCCCCC' : '').append('">');
                        if (this.plaOdds[i] == '---') buf.append('<span class="wpTdColor"><nobr>---</nobr></span>');
                        else if (this.plaOdds[i] == 'SCR' || this.tableObj[i][0].hScr == '1') buf.append('<nobr>').append(scratchLbl).append('</nobr>');
                        else if (isBracketReserveOrScratch(this.tableObj[i])) buf.append('<span class="wpTdColor"><nobr>---</nobr></span>');
                        else if (this.plaOdds[i] != null && ranRace < this.firstLeg && this.startSell == 1 && this.sellStatus.indexOf('PLA') >= 0) buf.append('<a class="wpTdColor" style="color:').append(getOddsFgColor(this.plaColorInd[i])).append(';background-color:').append(getOddsBgColor(this.plaColorInd[i])).append('" href="javascript:processQuickBet(\'PLA\', \'' + this.raceNo + '\', ' + i + ')">' + this.plaOdds[i] + '</a>');
                        else buf.append('<span class="wpTdColor" style="color:').append(getOddsFgColor(this.plaColorInd[i])).append(';background-color:').append(getOddsBgColor(this.plaColorInd[i])).append('">').append(this.plaOdds[i]).append('&nbsp</span>');
                        buf.append('</td>');
                    }
                }
                buf.append('</tr>');
            }
            // empty row
            for (var i = this.fieldSize + 1; i <= this.tableSize; i++) {
                // horse num
                buf.append('<tr>');
                if (this.showHorseNum) buf.append('<td align="center" class="').append(tbStyle[i % 2]).append('"  style="line-height:16px;').append(this.enableBorder ? 'border-left:1px solid #CCCCCC' : '').append('">&nbsp;</td>');
                if (enableBS) {
                    // banker box
                    if (this.enableBanker) buf.append('<td class="').append(tbStyle[i % 2]).append('" align="center"></td>');
                    // leg box
                    buf.append('<td class="').append(tbStyle[i % 2]).append('" align="center"></td>');
                }
                // horse name
                if (this.showHorseName) {
                    buf.append('<td class="').append(tbStyle[i % 2]).append('"></td>');
                    buf.append('<td class="').append(tbStyle[i % 2]).append('" style="').append((this.enableBorder && !this.enablePla) ? 'border-right:1px solid #CCCCCC' : '').append('">&nbsp;</td>');
                }
                if (this.showOdd) {
                    if (this.enablePla) {
                        buf.append('<td class="').append(tbStyle[i % 2]).append('" style="').append(this.enableBorder ? 'border-right:1px solid #CCCCCC' : '').append('">&nbsp;/td>');
                    }
                }
                buf.append('</tr>');
            }
            // field row
            if (enableBS && (this.enableField || this.force2ShowFieldRow) && this.fieldSize > 1) {
                var disabled = ranRace >= this.firstLeg || this.startSell == 0 || this.sellStatus.indexOf(this.selectPool) < 0 || isRaceAllRunnersReserve(this.raceNo);
                if (disabled) this.selectLegField = 0;
                buf.append('<tr>');
                if (this.showHorseNum) buf.append('<td align="center" class="tableContentEnd" style="BORDER-TOP:#a6a6a6 2px solid">F</td>');
                if (this.enableBanker) buf.append('<td class="tableContentEnd" style="BORDER-TOP:#a6a6a6 2px solid"align="center">&nbsp;</td>');
                var selectLegFieldSytle = (this.selectLegField == 1) ? 'background-color: #FFF4B0;' : '';
                if (this.isTableLayoutFixed) buf.append('<td class="tableContentEnd').append(specialPoolStyle).append('" style="BORDER-TOP:#a6a6a6 2px solid;padding-left: 2px;').append(selectLegFieldSytle).append('" align="center"');
                else buf.append('<td class="tableContentEnd').append(specialPoolStyle).append('" style="BORDER-TOP:#a6a6a6 2px solid;').append(selectLegFieldSytle).append('" align="center"');
                //buf.append((this.selectLegField == 1) ? ' style="background-color: #FFF4B0"' : '');
                buf.append('>');
                if (this.enableField) {
                    buf.append('<input type="checkbox" class="checkbox" onclick="fieldClick(\'').append(this.divId).append('\', ').append(this.tableId).append(');" ');
                    buf.append((this.selectLegField == 1) ? 'checked ' : '');
                    buf.append(disabled ? 'disabled' : '').append('>');
                } else {
                    buf.append('&nbsp;');
                }
                buf.append('</td>');
                if (this.showHorseName) buf.append('<td class="tableContentEnd" style="BORDER-TOP:#a6a6a6 2px solid">').append(this.lblField).append('</td>');
                if (this.showOdd) {
                    buf.append('<td class="tableContentEnd" style="BORDER-TOP:#a6a6a6 2px solid" align="center">&nbsp;</td>');
                    if (this.enablePla) buf.append('<td class="tableContentEnd" style="BORDER-TOP:#a6a6a6 2px solid" align="center">&nbsp;</td>');
                }
                buf.append('</tr>');
            }
            buf.append('</table>');
        }
        return buf.toString();
    };
    /*
    this.showWinOddTable = function(left, top) {
        $('#winOdds').html(getWinOddsTable(this));
        $('#winOddsHolder').css('position', 'absolute');
        $('#winOddsHolder').css('left', left + "px");
        $('#winOddsHolder').css('top', top + "px");
        $('#winOddsHolder').css('width', "200px");
    } */
}

function getWinOddsTable(tb) {
    var buf = new StringBuffer();
    buf.append('<table height="100%" cellSpacing="0" cellPadding="0" width="100%" border="0">');
    // title bar
    if (tb.box1 != '') {
        buf.append('<tr>');
        buf.append('<td class="titleBar" nowrap>' + tb.lblWin + '</td>');
        /*
        buf.append('<td class="titleBar" style="text-align: right;">');
        if (!hasStartedAutoRefresh) {
            buf.append(lblRefreshTime + ': <span id="winOddsTime">' + refreshTime + '</span>');
        }
        buf.append('</td>');
        */
        buf.append('</tr>');
    }
    buf.append('</table>');
    // horseTable
    buf.append('<table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #CCCCCC;table-layout:fixed" class="cwinWinOddsTable">');
    buf.append('<tr>');
    buf.append('<td class="tableContentHeadAlup" style="BORDER-BOTTOM:#cccccc 1px solid; width: 40px;" align="center" nowrap>').append(tb.lblHorseNum).append('</td>');
    buf.append('<td class="tableContentHeadAlup" style="BORDER-BOTTOM:#cccccc 1px solid" nowrap>').append(tb.lblHorseName).append('</td>');
    if (tb.showOdd) {
        buf.append('<td class="tableContentHeadAlup" style="BORDER-BOTTOM:#cccccc 1px solid; width: 45px;" align="center" nowrap>').append(tb.lblOdds).append('</td>');
    }
    buf.append('</tr>');
    for (var i = 1; i <= tb.fieldSize; i++) {
        buf.append('<tr>');
        // horse num
        buf.append('<td align="center" class="').append(tbStyle[i % 2]).append(" info_cell").append('" style="padding-left:1px;padding-right:1px;line-height:16px;').append(tb.enableBorder ? 'border-left:1px solid #CCCCCC' : '').append('"><nobr>').append(i);
        if (isAllBracketReserve(tb.tableObj[i])) buf.append('(').append(reserveLbl).append(')');
        buf.append('</nobr></td>');
        // horse name
        buf.append('<td class="').append(tbStyle[i % 2]).append(" info_cell")
        if (tb.horseNameWidthUnbound) buf.append('" ><div class="divWinHorseName0">');
        else if (tb.enableBanker) buf.append('" ><div class="divWinHorseName2">');
        else buf.append('" ><div class="divWinHorseName1">');
        for (var j = 0; j < tb.tableObj[i].length; j++) {
            if (j > 0) buf.append('<br>');
            if (!isOverseaMeeting)
            // START Nielsen Online SiteCensus
            //buf.append('<a href="javascript:goHorseRecord2(\'').append(jcewUrlLbl).append('\', \'').append(this.tableObj[i][j].hCode).append('\');">');
                buf.append('<a href="javascript:WACommonTagging(\'horse\');goHorseRecord2(\'').append(jcewUrlLbl).append('\', \'').append(tb.tableObj[i][j].hCode).append('\');">');
            // END Nielsen Online SiteCensus
            if (isOverseaMeeting && tb.tableObj[i][j].hCode != '') buf.append('(').append(tb.tableObj[i][j].hCode).append(')');
            if (tb.tableObj[i][j].hName != '') buf.append('<span class="hkscsfontfamily">').append(tb.tableObj[i][j].hName).append('</span>');
            else buf.append('-');
            if (!isOverseaMeeting) buf.append('</a>')
            if (!isAllBracketReserve(tb.tableObj[i]) && tb.tableObj[i][j].hStat.indexOf('R') >= 0) buf.append('<nobr>(').append(reserveLbl).append(')</nobr>');
            if (isOverseaMeeting && tb.tableObj[i][j].hStat.indexOf('S') >= 0) buf.append('<nobr>(').append(scratchLbl).append(')</nobr>');
        }
        buf.append('</div></td>');
        /*
        // prevent showing hf when ---
        if (!isNumericDash(tb.winOdds[i]))
            tb.winColorInd2[i] = 0;     */
        // prevent showing hf when ---
        if (!isNumericDash(tb.winOdds[i])) tb.winColorInd[i] = 0;
        if (tb.showOdd) {
            // win odds
            buf.append('<td style="border-right:1px solid #CCCCCC;" class="').append(tbStyle[i % 2]).append(" info_cell").append('" align="center">');
            if (tb.winOdds[i] == '---') buf.append('<span class="wpTdColor"><nobr>---</nobr></span>');
            else if (tb.winOdds[i] == 'SCR' || tb.tableObj[i][0].hScr == '1') {
                buf.append('<nobr>').append(scratchLbl).append('</nobr>');
            } else if (isBracketReserveOrScratch(tb.tableObj[i])) {
                buf.append('<span class="wpTdColor"><nobr>---</nobr></span>');
            } else if (tb.winOdds[i] != null && ranRace < tb.firstLeg && tb.startSell == 1 && tb.sellStatus.indexOf('WIN') >= 0) { // winColorInd2
                if (allUpPools != 'CWIN') buf.append('<a class="wpTdColor" style="color:').append(getOddsFgColor(tb.winColorInd[i])).append(';background-color:').append(getOddsBgColor(tb.winColorInd[i])).append('" href="javascript:processQuickBet(\'WIN\', \'' + tb.raceNo + '\', ' + i + ')">' + tb.winOdds[i] + '</a>');
                else buf.append('<span class="wpTdColor" style="color:').append(getOddsFgColor(tb.winColorInd[i])).append(';background-color:').append(getOddsBgColor(tb.winColorInd[i])).append('">' + tb.winOdds[i] + '</span>');
            } else {
                buf.append('<span class="wpTdColor" style="color:').append(getOddsFgColor(tb.winColorInd[i])).append(';background-color:').append(getOddsBgColor(tb.winColorInd[i])).append('">').append(tb.winOdds[i]).append('</span>');
            }
            buf.append('</td>');
        }
        buf.append('</tr>');
    }
    /*
    // empty row
    for (var i = tb.fieldSize + 1; i <= tb.tableSize; i++) {
        // horse num
        buf.append('<tr>');

        buf.append('<td align="center" class="').append(tbStyle[i % 2]).append('"  style="line-height:16px;')
         .append(tb.enableBorder ? 'border-left:1px solid #CCCCCC' : '').append('">&nbsp;</td>');


        buf.append('<td class="').append(tbStyle[i % 2]).append('"></td>');
        if (tb.showOdd) {
            buf.append('<td class="').append(tbStyle[i % 2]).append('" style="')
             .append((tb.enableBorder && !tb.enablePla) ? 'border-right:1px solid #CCCCCC' : '').append('">&nbsp;</td>');
        }
        buf.append('</tr>');
    }
    */
    buf.append('</table>');
    return buf.toString();
}

function poolBoxChange(divObj, tblId, selectObjValue) {
    if (isCwin(wpTableList[tblId].selectPool)) {
        wpTableList[tblId].clearCheckBox();
    }
    switch (selectObjValue) {
        case 'WIN':
        case 'PLA':
        case 'W-P':
            wpTableList[tblId].enableBanker = false;
            wpTableList[tblId].clearBankerCheckBox();
            break;
        case 'CWA':
        case 'CWB':
        case 'CWC':
            wpTableList[tblId].enableBanker = false;
            wpTableList[tblId].clearCheckBox();
            break;
        case 'QIN':
        case 'QPL':
        case 'QQP':
        case 'TRI':
        default:
            wpTableList[tblId].enableBanker = true;
            break;
    }
    if (isEditBetMode && typeof openEditOddsContent == 'function') {
        wpTableList[tblId].clearCheckBox();
    }
    wpTableList[tblId].selectPool = selectObjValue;
    if (typeof syncTableRowHeight == 'function') syncTableRowHeight();
    wpTableList[tblId].setInnerTableHtml();
    if (isEditBetMode && typeof openEditOddsContent == 'function') {
        openEditOddsContent();
    }
    displayCwinRemark();
}

function bankerClick(divObj, tblId, i) {
    if (wpTableList[tblId].selectBanker[i] != 1) {
        wpTableList[tblId].selectBanker[i] = 1;
        wpTableList[tblId].selectLeg[i] = 0;
    } else wpTableList[tblId].selectBanker[i] = 0;
    if (typeof correctSelection == 'function') {
        correctSelection(divObj, tblId, i, 'banker');
    }
    resetRanGenFlag();
    wpTableList[tblId].setInnerTableHtml();
    if (isEditBetMode && typeof openEditOddsContent == 'function') {
        openEditOddsContent();
    }
}

function legClick(divObj, tblId, i) {
    if (wpTableList[tblId].selectLeg[i] != 1) {
        wpTableList[tblId].selectLeg[i] = 1;
        wpTableList[tblId].selectBanker[i] = 0;
    } else wpTableList[tblId].selectLeg[i] = 0;
    if (typeof correctSelection == 'function') {
        correctSelection(divObj, tblId, i, 'leg');
    }
    if (typeof checkQttOddsEnqEnable == 'function') {
        checkQttOddsEnqEnable();
    }
    resetRanGenFlag();
    wpTableList[tblId].setInnerTableHtml();
    if (isEditBetMode && typeof openEditOddsContent == 'function') {
        openEditOddsContent();
    }
}

function fieldClick(divObj, tblId) {
    if (wpTableList[tblId].selectLegField != 1) {
        wpTableList[tblId].selectLegField = 1;
        for (var i = 1; i <= wpTableList[tblId].tableSize; i++) {
            wpTableList[tblId].selectLeg[i] = 0;
        }
    } else wpTableList[tblId].selectLegField = 0;
    resetRanGenFlag();
    wpTableList[tblId].setInnerTableHtml();
    if (isEditBetMode && typeof openEditOddsContent == 'function') {
        openEditOddsContent();
    }
}
///////////////////////////////////////////////////
// Win Place Checkbox Object
///////////////////////////////////////////////////
function WinPlaceCheckBoxObj(rNo) {
    this.raceNo = rNo;
    this.startSell = 0;
    this.sellStatus = '';
    this.id = '';
    this.tableId = '';
    this.tableSize = arrSize;
    this.tableObj = new Array(arrSize);
    this.selectLeg = new Array();
    this.selectLeg['WIN'] = new Array(arrSize);
    this.selectLeg['PLA'] = new Array(arrSize);
    this.selectLeg['W-P'] = new Array(arrSize);
    this.selectField = new Array();
    this.selectField['WIN'] = 0;
    this.selectField['PLA'] = 0;
    this.selectField['W-P'] = 0;
    this.winOdds = new Array(arrSize);
    this.winColorInd = new Array(arrSize);
    this.plaOdds = new Array(arrSize);
    this.plaColorInd = new Array(arrSize);
    this.horseNumLbl = '';
    this.horseColorLbl = '';
    this.horseNameLbl = '';
    this.barDrawLbl = '';
    this.handicapLbl = '';
    this.jockeyLbl = '';
    this.trainerLbl = '';
    this.winLbl = '';
    this.plaLbl = '';
    this.wipLbl = '';
    this.fieldLbl = '';
    this.createBetObject = function(pool) {
        var betObj = new BetObject();
        for (var i = 0; i < this.selectLeg[pool].length; i++) {
            if (this.selectLeg[pool][i] == 1) {
                if (betObj.legNo > 0) betObj.legBuf.append('+');
                betObj.legBuf.append(i);
                betObj.legNo++;
            }
        }
        // Field
        if (this.selectField[pool] == 1) {
            if (betObj.legNo > 0) betObj.legBuf.append('+');
            betObj.legBuf.append('F');
            betObj.legNo = 24; // must be greatest
        }
        return betObj;
    }
    this.clearCheckBox = function(pool) {
        for (var i = 0; i < this.selectLeg[pool].length; i++) {
            this.selectLeg[pool][i] = 0;
        }
        this.selectField[pool] = 0;
    }
    this.clearWinOdds = function() {
        for (var i = 1; i < arrSize; i++) {
            this.winOdds[i] = '';
            this.winColorInd[i] = 0;
        }
    }
    this.clearPlaOdds = function() {
        for (var i = 1; i < arrSize; i++) {
            this.plaOdds[i] = '';
            this.plaColorInd[i] = 0;
        }
    }
    this.generateTable = function() {
        var buf = new StringBuffer();
        buf.append('<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr>');
        buf.append('<td class="tableContentHead" align="center" nowrap>').append(this.horseNumLbl).append('</td>');
        buf.append('<td class="tableContentHead" align="center" nowrap>').append(this.horseColorLbl).append('</td>');
        buf.append('<td class="tableContentHead" width="15%" nowrap>').append(this.horseNameLbl).append('</td>');
        buf.append('<td class="tableContentHead" align="center" nowrap>').append(this.barDrawLbl).append('</td>');
        buf.append('<td class="tableContentHead" align="center" nowrap>').append(this.handicapLbl).append('</td>');
        buf.append('<td class="tableContentHead" width="12%" nowrap>').append(this.jockeyLbl).append('</td>');
        buf.append('<td class="tableContentHead" width="12%" nowrap>').append(this.trainerLbl).append('</td>');
        buf.append('<td id="lblWin" class="tableContentHead" align="center" nowrap>').append(this.winLbl).append('</td>');
        buf.append('<td id="lblPla" class="tableContentHead" align="center" nowrap>').append(this.plaLbl).append('</td>');
        buf.append('<td id="lblWip"class="tableContentHead" align="center" nowrap>').append(this.wipLbl).append('</td></tr>');
        for (var i = 1; i <= this.tableSize; i++) {
            // horse num
            var subRowSize = this.tableObj[i].length;
            buf.append('<tr height="22px"><td class="').append(tbStyleDtls[i % 2]).append(" info_cell").append('" valign="middle" align="center" rowspan="').append(subRowSize).append('">').append(i).append('</td>');
            buf.append(getTableInnerRow(this.tableObj[i][0], '', true, true));
            buf.append('<td id="winCell').append(i).append('" class="').append(tbStyleDtls[i % 2]).append('" valign="middle" rowspan="').append(subRowSize).append('"></td>');
            buf.append('<td id="plaCell').append(i).append('" class="').append(tbStyleDtls[i % 2]).append('" valign="middle" rowspan="').append(subRowSize).append('"></td>');
            buf.append('<td id="wipCell').append(i).append('" class="').append(tbStyleDtls[i % 2]).append('" valign="middle" align="center" rowspan="').append(subRowSize).append('"></td></tr>');
            for (var j = 1; j < subRowSize; j++) {
                buf.append('<tr height="22">');
                buf.append(getTableInnerRow(this.tableObj[i][j], 'style="BORDER-TOP: #ffffff 1px solid;"', true, true));
                buf.append('</tr>');
            }
        }
        // Field
        if (enableBS) {
            buf.append('<tr><td class="tableContentEnd" style="BORDER-TOP:#a6a6a6 2px solid" align="center">F</td>');
            buf.append('<td class="tableContentEnd" style="BORDER-TOP:#a6a6a6 2px solid" colspan="5">&nbsp;</td>');
            buf.append('<td id="lblFull" class="tableContentEnd" style="BORDER-TOP:#a6a6a6 2px solid">').append(this.fieldLbl).append('</td>');
            buf.append('<td id="winCellF" class="tableContentEnd" style="BORDER-TOP:#a6a6a6 2px solid">&nbsp;</td>');
            buf.append('<td id="plaCellF" class="tableContentEnd" style="BORDER-TOP:#a6a6a6 2px solid">&nbsp;</td>');
            buf.append('<td id="wipCellF" class="tableContentEnd" align="center" style="BORDER-TOP:#a6a6a6 2px solid">&nbsp;</td>');
            buf.append('</tr>');
        }
        buf.append('</table>');
        document.getElementById('detailWPTable').innerHTML = buf.toString();
    };
    this.setInnerTableHtml = function() {
        for (var i = 1; i <= this.tableSize; i++) {
            var subRowSize = this.tableObj[i].length;
            for (var j = 0; j < subRowSize; j++) {
                if (isOverseaMeeting && this.tableObj[i][j].brand != '') {
                    document.getElementById('wpColorCell' + this.tableObj[i][j].brand).innerHTML = setClothOrReserveCell(this.tableObj[i][j]);
                    LoadRaceColorImage(this.tableObj[i][j].brand);
                }
            }
            // win checkbox
            var buf = new StringBuffer();
            if (enableBS) {
                var disabled = this.tableObj[i][0].hName == '' || this.selectField['WIN'] == 1 || this.tableObj[i][0].hScr == '1' || ranRace >= this.raceNo || this.startSell == 0 || this.sellStatus.indexOf('WIN') < 0 || isBracketReserveOrScratch(this.tableObj[i]);
                if (disabled) this.selectLeg['WIN'][i] = 0;
                buf.append('<input style="vertical-align:middle" type="checkbox" class="checkbox" onclick="wpLegClick(').append(this.raceNo).append(', ').append(i).append(', \'WIN\');" ');
                buf.append((this.selectLeg['WIN'][i] == 1) ? 'checked ' : '');
                buf.append(disabled ? 'disabled' : '').append('>');
            }
            //buf.append('<span style="width:10px"></span>');
            buf.append('<img src="/info/include/images/spacer.gif" width="10px">');
            // prevent showing hf when ---
            if (!isNumericDash(this.winOdds[i])) this.winColorInd[i] = 0;
            if (!isNumericDash(this.plaOdds[i])) this.plaColorInd[i] = 0;
            // win odds
            if (this.winOdds[i] == '---') buf.append('<span class="wpTdColor"><nobr>---</nobr></span>');
            else if (this.winOdds[i] == 'SCR' || this.tableObj[i][0].hScr == '1') buf.append('<nobr>').append(scratchLbl).append('</nobr>');
            else if (isBracketReserveOrScratch(this.tableObj[i])) buf.append('<span class="wpTdColor"><nobr>---</nobr></span>');
            else if (this.winOdds[i] != null && ranRace < this.raceNo && this.startSell == 1 && this.sellStatus.indexOf('WIN') >= 0) buf.append('<a class="wpTdColor" style="color:').append(getOddsFgColor(this.winColorInd[i])).append(';background-color:').append(getOddsBgColor(this.winColorInd[i])).append('" href="javascript:processQuickBet(\'WIN\', \'' + this.raceNo + '\', ' + i + ')">' + this.winOdds[i] + '</a>');
            else buf.append('<span class="wpTdColor" style="color:').append(getOddsFgColor(this.winColorInd[i])).append(';background-color:').append(getOddsBgColor(this.winColorInd[i])).append('">').append(this.winOdds[i]).append('</span>');
            document.getElementById('winCell' + i).style.backgroundColor = (this.selectLeg['WIN'][i] == 1) ? '#FFF4B0' : '';
            document.getElementById('winCell' + i).innerHTML = buf.toString();
            // pla checkbox
            buf = new StringBuffer();
            if (enableBS) {
                var disabled = this.tableObj[i][0].hName == '' || this.selectField['PLA'] == 1 || this.tableObj[i][0].hScr == '1' || ranRace >= this.raceNo || this.startSell == 0 || this.sellStatus.indexOf('PLA') < 0 || isBracketReserveOrScratch(this.tableObj[i]);
                if (disabled) this.selectLeg['PLA'][i] = 0;
                buf.append('<input style="vertical-align:middle"  type="checkbox" class="checkbox" onclick="wpLegClick(').append(this.raceNo).append(', ').append(i).append(', \'PLA\');" ');
                buf.append((this.selectLeg['PLA'][i] == 1) ? 'checked ' : '');
                buf.append(disabled ? 'disabled' : '').append('>');
            }
            //buf.append('<span style="width:10px"></span>');
            buf.append('<img src="/info/include/images/spacer.gif" width="10px">');
            // pla odds
            if (this.plaOdds[i] == '---') buf.append('<span class="wpTdColor"><nobr>---</nobr></span>');
            else if (this.plaOdds[i] == 'SCR' || this.tableObj[i][0].hScr == '1') buf.append('<nobr>').append(scratchLbl).append('</nobr>');
            else if (isBracketReserveOrScratch(this.tableObj[i])) buf.append('<span class="wpTdColor"><nobr>---</nobr></span>');
            else if (this.plaOdds[i] != null && ranRace < this.raceNo && this.startSell == 1 && this.sellStatus.indexOf('PLA') >= 0) buf.append('<a class="wpTdColor" style="color:').append(getOddsFgColor(this.plaColorInd[i])).append(';background-color:').append(getOddsBgColor(this.plaColorInd[i])).append('" href="javascript:processQuickBet(\'PLA\', \'' + this.raceNo + '\', ' + i + ')">' + this.plaOdds[i] + '</a>');
            else buf.append('<span class="wpTdColor" style="color:').append(getOddsFgColor(this.plaColorInd[i])).append(';background-color:').append(getOddsBgColor(this.plaColorInd[i])).append('">').append(this.plaOdds[i]).append('</span>');
            document.getElementById('plaCell' + i).style.backgroundColor = (this.selectLeg['PLA'][i] == 1) ? '#FFF4B0' : '';
            document.getElementById('plaCell' + i).innerHTML = buf.toString();
            // W-P checkbox
            buf = new StringBuffer();
            if (enableBS) {
                var disabled = this.tableObj[i][0].hName == '' || this.selectField['W-P'] == 1 || this.tableObj[i][0].hScr == '1' || ranRace >= this.raceNo || this.startSell == 0 || this.sellStatus.indexOf('W-P') < 0 || isBracketReserveOrScratch(this.tableObj[i]);
                if (disabled) this.selectLeg['W-P'][i] = 0;
                buf.append('<input type="checkbox" class="checkbox" onclick="wpLegClick(').append(this.raceNo).append(', ').append(i).append(', \'W-P\');" ');
                buf.append((this.selectLeg['W-P'][i] == 1) ? 'checked ' : '');
                buf.append(disabled ? 'disabled' : '').append('>');
            }
            document.getElementById('wipCell' + i).style.backgroundColor = (this.selectLeg['W-P'][i] == 1) ? '#FFF4B0' : '';
            document.getElementById('wipCell' + i).innerHTML = buf.toString();
        }
        // Field
        if (enableBS) {
            var disabled = ranRace >= this.raceNo || this.startSell == 0 || this.sellStatus.indexOf('WIN') < 0 || isRaceAllRunnersReserve(this.raceNo);
            if (disabled) this.selectField['WIN'] = 0;
            var buf = new StringBuffer();
            buf.append('<input type="checkbox" class="checkbox" onclick="wpFieldClick(\'').append(this.raceNo).append('\', \'WIN\');" ');
            buf.append((this.selectField['WIN'] == 1) ? 'checked ' : '');
            buf.append(disabled ? 'disabled' : '').append('>');
            document.getElementById('winCellF').style.backgroundColor = (this.selectField['WIN'] == 1) ? '#FFF4B0' : '';
            document.getElementById('winCellF').innerHTML = buf.toString();
            disabled = ranRace >= this.raceNo || this.startSell == 0 || this.sellStatus.indexOf('PLA') < 0 || isRaceAllRunnersReserve(this.raceNo);
            if (disabled) this.selectField['PLA'] = 0;
            buf = new StringBuffer();
            buf.append('<input type="checkbox" class="checkbox" onclick="wpFieldClick(\'').append(this.raceNo).append('\', \'PLA\');" ');
            buf.append((this.selectField['PLA'] == 1) ? 'checked ' : '');
            buf.append(disabled ? 'disabled' : '').append('>');
            document.getElementById('plaCellF').style.backgroundColor = (this.selectField['PLA'] == 1) ? '#FFF4B0' : '';
            document.getElementById('plaCellF').innerHTML = buf.toString();
            disabled = ranRace >= this.raceNo || this.startSell == 0 || this.sellStatus.indexOf('W-P') < 0 || isRaceAllRunnersReserve(this.raceNo);
            if (disabled) this.selectField['W-P'] = 0;
            buf = new StringBuffer();
            buf.append('<input type="checkbox" class="checkbox" onclick="wpFieldClick(\'').append(this.raceNo).append('\', \'W-P\');" ');
            buf.append((this.selectField['W-P'] == 1) ? 'checked ' : '');
            buf.append(disabled ? 'disabled' : '').append('>');
            document.getElementById('wipCellF').style.backgroundColor = (this.selectField['W-P'] == 1) ? '#FFF4B0' : '';
            document.getElementById('wipCellF').innerHTML = buf.toString();
        }
    }
}

function setClothOrReserveCell(tbObj) {
    var buf = new StringBuffer();
    if (tbObj.hStat.indexOf('R') >= 0) buf.append('(').append(reserveLbl).append(')');
    else {
        buf.append('<img title="').append(tbObj.brand).append('" width="17" height="22" id="wpTableImg').append(tbObj.brand).append('" src="/info/include/images/spacer.gif">');
    }
    return buf.toString();
}

function getTableInnerRow(tbObj, pBorder, showColor, showSCR) {
    var buf = new StringBuffer();
    // Color Or Reserve
    if (showColor) {
        buf.append('<td align="center" class="').append(tbStyleDtls[tbObj.num % 2]).append(' info_cell" ').append(pBorder);
        if (tbObj.brand != '') buf.append(' id="wpColorCell').append(tbObj.brand).append('"');
        buf.append('>');
        buf.append(setClothOrReserveCell(tbObj));
        buf.append('</td>');
    }
    // Horse Name
    buf.append('<td class="').append(tbStyleDtls[tbObj.num % 2]).append(' info_cell" ').append(pBorder).append('>')
    if (isOverseaMeeting) {
        if (tbObj.hCode != '') buf.append('(').append(tbObj.hCode).append(')')
        if (tbObj.hName != '') buf.append('<span class="hkscsfontfamily">').append(tbObj.hName).append('</span>');
        else buf.append('-');
    } else
    // START Nielsen Online SiteCensus
    //buf.append('<a href="javascript:goHorseRecord2(\'').append(jcewUrlLbl).append('\', \'').append(tbObj.hCode).append('\');">')
        buf.append('<a href="javascript:WACommonTagging(\'horse\');goHorseRecord2(\'').append(jcewUrlLbl).append('\', \'').append(tbObj.hCode).append('\');">').append('<span class="hkscsfontfamily">').append(tbObj.hName).append('</span>').append('</a>');
    // END Nielsen Online SiteCensus
    if (!showSCR && tbObj.hStat.indexOf('S') >= 0) buf.append('<nobr>(').append(scratchLbl).append(')</nobr>');
    buf.append('</td>');
    // Scratch or not
    if (showSCR && tbObj.hStat.indexOf('S') >= 0) {
        buf.append('<td class="').append(tbStyleDtls[tbObj.num % 2]).append(" info_cell").append('" align="center" colspan="4" ').append(pBorder).append('>(').append(scratchLbl).append(')</td>');
    } else {
        // Draw & Handicap
        var tmpDraw = (tbObj.draw != null && tbObj.draw != '') ? parseInt(tbObj.draw, 10) : '';
        buf.append('<td class="').append(tbStyleDtls[tbObj.num % 2]).append(' info_cell" align="center" ').append(pBorder).append('>').append(tmpDraw).append('</td>');
        buf.append('<td class="').append(tbStyleDtls[tbObj.num % 2]).append(' info_cell" align="center" ').append(pBorder).append('>').append(tbObj.handicap).append('</td>');
        // Jockey Name
        buf.append('<td class="').append(tbStyleDtls[tbObj.num % 2]).append(' info_cell" ').append(pBorder).append('>')
        if (isOverseaMeeting) buf.append('<span class="hkscsfontfamily">').append(tbObj.jName).append('</span>');
        else
        // START Nielsen Online SiteCensus
        //buf.append('<a href="javascript:goJockeyRecord2(\'').append(jcewUrlLbl).append('\', \'').append(tbObj.jCode).append('\');">')
            buf.append('<a href="javascript:WACommonTagging(\'jockey\');goJockeyRecord2(\'').append(jcewUrlLbl).append('\', \'').append(tbObj.jCode).append('\');">').append('<span class="hkscsfontfamily">').append(tbObj.jName).append('</span>').append('</a>');
        // END Nielsen Online SiteCensus
        buf.append('</td>');
        // Trainer Name
        buf.append('<td class="').append(tbStyleDtls[tbObj.num % 2]).append(' info_cell" ').append(pBorder).append('>')
        if (isOverseaMeeting) buf.append('<span class="hkscsfontfamily">').append(tbObj.tName).append('</span>');
        else
        // START Nielsen Online SiteCensus
        //buf.append('<a href="javascript:goTrainerRecord2(\'').append(jcewUrlLbl).append('\', \'').append(tbObj.tCode).append('\');">')
            buf.append('<a href="javascript:WACommonTagging(\'trainer\');goTrainerRecord2(\'').append(jcewUrlLbl).append('\', \'').append(tbObj.tCode).append('\');">').append('<span class="hkscsfontfamily">').append(tbObj.tName).append('</span>').append('</a>');
        // END Nielsen Online SiteCensus
        buf.append('</td>');
    }
    return buf.toString();
}

function wpLegClick(tblId, i, pool) {
    if (wpTableList[tblId].selectLeg[pool][i] != 1) wpTableList[tblId].selectLeg[pool][i] = 1;
    else wpTableList[tblId].selectLeg[pool][i] = 0;
    wpTableList[tblId].setInnerTableHtml();
    if (isEditBetMode && typeof openEditOddsContent == 'function') {
        openEditOddsContent();
    }
}

function wpFieldClick(tblId, pool) {
    if (wpTableList[tblId].selectField[pool] != 1) {
        wpTableList[tblId].selectField[pool] = 1;
        for (var i = 1; i <= wpTableList[tblId].tableSize; i++) {
            wpTableList[tblId].selectLeg[pool][i] = 0;
        }
    } else wpTableList[tblId].selectField[pool] = 0;
    wpTableList[tblId].setInnerTableHtml();
    if (isEditBetMode && typeof openEditOddsContent == 'function') {
        openEditOddsContent();
    }
}
///////////////////////////////////////////////////
// Progressive Win Odds Object
///////////////////////////////////////////////////
function PWinTableObj(rNo) {
    this.raceNo = rNo;
    this.startSell = 0;
    this.sellStatus = '';
    this.id = '';
    this.tableId = '';
    this.tableSize = 14;
    this.tableObj = new Array(arrSize);
    this.pwinOdds = new Array(2);
    this.pwinOdds[0] = new Array('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
    this.pwinOdds[1] = new Array('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
    this.winOdds = new Array(arrSize);
    this.winColorInd = new Array(arrSize);
    this.plaOdds = new Array(arrSize);
    this.plaColorInd = new Array(arrSize);
    this.horseNumLbl = '';
    this.horseColorLbl = '';
    this.horseNameLbl = '';
    this.barDrawLbl = '';
    this.handicapLbl = '';
    this.jockeyLbl = '';
    this.trainerLbl = '';
    this.winLbl = '';
    this.plaLbl = '';
    this.pwinLbl = '';
    this.wipLbl = '';
    this.fieldLbl = '';
    this.generateTable = function() {
        var buf = new StringBuffer();
        buf.append('<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr>');
        buf.append('<td class="tableContentHead" align="center"  style="BORDER-BOTTOM:#cccccc 1px solid" rowspan="2" nowrap>').append(this.horseNumLbl).append('</td>');
        buf.append('<td class="tableContentHead" align="center"  style="BORDER-BOTTOM:#cccccc 1px solid" rowspan="2" nowrap>').append(this.horseColorLbl).append('</td>');
        buf.append('<td class="tableContentHead" width="15%" style="BORDER-BOTTOM:#cccccc 1px solid" rowspan="2" nowrap>').append(this.horseNameLbl).append('</td>');
        buf.append('<td class="tableContentHead" align="center" style="BORDER-BOTTOM:#cccccc 1px solid" rowspan="2" nowrap>').append(this.barDrawLbl).append('</td>');
        buf.append('<td class="tableContentHead" align="center" style="BORDER-BOTTOM:#cccccc 1px solid" rowspan="2" nowrap>').append(this.handicapLbl).append('</td>');
        buf.append('<td class="tableContentHead" width="12%" style="BORDER-BOTTOM:#cccccc 1px solid" rowspan="2" nowrap>').append(this.jockeyLbl).append('</td>');
        buf.append('<td class="tableContentHead" width="12%" style="BORDER-BOTTOM:#cccccc 1px solid" rowspan="2" nowrap>').append(this.trainerLbl).append('</td>');
        buf.append('<td class="tableContentHead" align="center" style="BORDER-BOTTOM:#cccccc 1px solid" colspan="3" nowrap>').append(this.pwinLbl).append('</td>');
        buf.append('<td class="tableContentHead" align="center" style="BORDER-BOTTOM:#cccccc 1px solid" rowspan="2" nowrap>').append(this.plaLbl).append('</td></tr>');
        buf.append('<tr><td class="tableContentHead" style="PADDING-BOTTOM:2px; PADDING-TOP:2px; BORDER-BOTTOM:#cccccc 1px solid" align="center" nowrap><span id="PwinTime0">&nbsp;</span></td>');
        buf.append('<td class="tableContentHead" style="PADDING-BOTTOM:2px; PADDING-TOP:2px; BORDER-BOTTOM:#cccccc 1px solid" align="center" nowrap><span id="PwinTime1">&nbsp;</span></td>');
        buf.append('<td class="tableContentHead" style="PADDING-BOTTOM:2px; PADDING-TOP:2px; BORDER-BOTTOM:#cccccc 1px solid" align="center" nowrap><span id="PwinTime">&nbsp;</span></td></tr>');
        for (var i = 1; i <= this.tableSize; i++) {
            // horse num
            var subRowSize = this.tableObj[i].length;
            buf.append('<tr height="22px"><td class="').append(tbStyleDtls[i % 2]).append('" valign="middle" align="center" rowspan="').append(subRowSize).append('">').append(i).append('</td>');
            buf.append(getTableInnerRow(this.tableObj[i][0], '', true, true));
            buf.append('<td id="pwin0Cell').append(i).append('" class="').append(tbStyleDtls[i % 2]).append('" align="center" valign="middle" rowspan="').append(subRowSize).append('"></td>');
            buf.append('<td id="pwin1Cell').append(i).append('" class="').append(tbStyleDtls[i % 2]).append('" align="center" valign="middle" rowspan="').append(subRowSize).append('"></td>');
            buf.append('<td id="pwin2Cell').append(i).append('" class="').append(tbStyleDtls[i % 2]).append('" align="center" valign="middle" rowspan="').append(subRowSize).append('"></td>');
            buf.append('<td id="plaCell').append(i).append('" class="').append(tbStyleDtls[i % 2]).append('" align="center" valign="middle" rowspan="').append(subRowSize).append('"></td></tr>');
            for (var j = 1; j < subRowSize; j++) {
                buf.append('<tr height="22">');
                buf.append(getTableInnerRow(this.tableObj[i][j], 'style="BORDER-TOP: #ffffff 1px solid;"', true, true));
                buf.append('</tr>');
            }
        }
        buf.append('</table>');
        document.getElementById('detailWPTable').innerHTML = buf.toString();
    };
    this.setInnerTableHtml = function() {
        for (var i = 1; i <= this.tableSize; i++) {
            var subRowSize = this.tableObj[i].length;
            for (var j = 0; j < subRowSize; j++) {
                if (isOverseaMeeting && this.tableObj[i][j].brand != '') {
                    document.getElementById('wpColorCell' + this.tableObj[i][j].brand).innerHTML = setClothOrReserveCell(this.tableObj[i][j]);
                    LoadRaceColorImage(this.tableObj[i][j].brand);
                }
            }
            // pwin odds
            if (this.pwinOdds[0][i - 1] == undefined) document.getElementById('pwin0Cell' + i).innerHTML = '';
            else if (this.pwinOdds[0][i - 1] == '---') document.getElementById('pwin0Cell' + i).innerHTML = '---';
            else if (this.pwinOdds[0][i - 1] == 'SCR' || this.winOdds[i] == 'SCR' || this.tableObj[i][0].hScr == '1') document.getElementById('pwin0Cell' + i).innerHTML = scratchLbl;
            else document.getElementById('pwin0Cell' + i).innerHTML = this.pwinOdds[0][i - 1];
            if (this.pwinOdds[1][i - 1] == undefined) document.getElementById('pwin1Cell' + i).innerHTML = '';
            else if (this.pwinOdds[1][i - 1] == '---') document.getElementById('pwin1Cell' + i).innerHTML = '---';
            else if (this.pwinOdds[1][i - 1] == 'SCR' || this.winOdds[i] == 'SCR' || this.tableObj[i][0].hScr == '1') document.getElementById('pwin1Cell' + i).innerHTML = scratchLbl;
            else document.getElementById('pwin1Cell' + i).innerHTML = this.pwinOdds[1][i - 1];
            var buf = new StringBuffer();
            // prevent showing hf when ---
            if (!isNumericDash(this.winOdds[i])) this.winColorInd[i] = 0;
            if (!isNumericDash(this.plaOdds[i])) this.plaColorInd[i] = 0;
            // win odds
            if (this.winOdds[i] == '---') buf.append('<nobr>').append('---').append('</nobr>');
            else if (this.winOdds[i] == 'SCR' || this.tableObj[i][0].hScr == '1') buf.append('<nobr>').append(scratchLbl).append('</nobr>');
            else if (isBracketReserveOrScratch(this.tableObj[i])) buf.append('<span class="wpTdColor"><nobr>---</nobr></span>');
            else if (this.winOdds[i] != null && ranRace < this.raceNo && this.startSell == 1 && this.sellStatus.indexOf('WIN') >= 0) buf.append('<a class="wpTdColor" style="color:').append(getOddsFgColor(this.winColorInd[i])).append(';background-color:').append(getOddsBgColor(this.winColorInd[i])).append('" href="javascript:processQuickBet(\'WIN\', \'' + this.raceNo + '\', ' + i + ')">' + this.winOdds[i] + '</a>');
            else buf.append('<span class="wpTdColor" style="color:').append(getOddsFgColor(this.winColorInd[i])).append(';background-color:').append(getOddsBgColor(this.winColorInd[i])).append('">').append(this.winOdds[i]).append('</span>');
            document.getElementById('pwin2Cell' + i).innerHTML = buf.toString();
            buf = new StringBuffer();
            // pla odds
            if (this.plaOdds[i] == undefined) buf.append('<nobr></nobr>');
            else if (this.plaOdds[i] == '---') buf.append('<nobr>').append('---').append('</nobr>');
            else if (this.plaOdds[i] == 'SCR' || this.tableObj[i][0].hScr == '1') buf.append('<nobr>').append(scratchLbl).append('</nobr>');
            else if (isBracketReserveOrScratch(this.tableObj[i])) buf.append('<span class="wpTdColor"><nobr>---</nobr></span>');
            else if (this.plaOdds[i] != null && ranRace < this.raceNo && this.startSell == 1 && this.sellStatus.indexOf('PLA') >= 0) buf.append('<a class="wpTdColor" style="color:').append(getOddsFgColor(this.plaColorInd[i])).append(';background-color:').append(getOddsBgColor(this.plaColorInd[i])).append('" href="javascript:processQuickBet(\'PLA\', \'' + this.raceNo + '\', ' + i + ')">' + this.plaOdds[i] + '</a>');
            else buf.append('<span class="wpTdColor" style="color:').append(getOddsFgColor(this.plaColorInd[i])).append(';background-color:').append(getOddsBgColor(this.plaColorInd[i])).append('">').append(this.plaOdds[i]).append('</span>');
            document.getElementById('plaCell' + i).innerHTML = buf.toString();
        }
    };
}
///////////////////////////////////////////////////
// JTTable Checkbox Object
///////////////////////////////////////////////////
function JTComboTable(totalRaces) {
    this.raceNo = totalRaces;
    this.jtcChild = new Array(this.raceNo + 1);
    this.hasRecord = false;
    this.raceNumLbl = '';
    this.horseNumLbl = '';
    this.horseColorLbl = '';
    this.horseNameLbl = '';
    this.barDrawLbl = '';
    this.handicapLbl = '';
    this.jockeyLbl = '';
    this.trainerLbl = '';
    this.winLbl = '';
    this.plaLbl = '';
    this.wipLbl = '';
    this.generateTable = function() {
        var buf = new StringBuffer();
        if (this.hasRecord) {
            buf.append('<table width="100%" border="0" cellspacing="0" cellpadding="0">');
            buf.append(this.printJTComboHeader());
            var styleIdx = 1;
            for (var i = 1; i <= this.raceNo; i++) {
                buf.append(this.jtcChild[i].generateTable(styleIdx));
                styleIdx += this.jtcChild[i].displayCnt();
            }
            buf.append('</table>');
        }
        document.getElementById('detailWPTable').innerHTML = buf.toString();
    }
    this.printJTComboHeader = function() {
        var buf = new StringBuffer();
        buf.append('<tr><td class="tableContentHead" align="center" nowrap>').append(this.raceNumLbl).append('</td>');
        buf.append('<td class="tableContentHead" align="center" nowrap>').append(this.horseNumLbl).append('</td>');
        buf.append('<td class="tableContentHead" width="15%" nowrap>').append(this.horseNameLbl).append('</td>');
        buf.append('<td class="tableContentHead" align="center" nowrap>').append(this.barDrawLbl).append('</td>');
        buf.append('<td class="tableContentHead" align="center" nowrap>').append(this.handicapLbl).append('</td>');
        buf.append('<td class="tableContentHead" width="12%" nowrap>').append(this.jockeyLbl).append('</td>');
        buf.append('<td class="tableContentHead" width="12%" nowrap>').append(this.trainerLbl).append('</td>');
        buf.append('<td class="tableContentHead" align="center" nowrap>').append(this.winLbl).append('</td>');
        buf.append('<td class="tableContentHead" align="center" nowrap>').append(this.plaLbl).append('</td>');
        buf.append('<td class="tableContentHead" align="center" nowrap>').append(this.wipLbl).append('</td></tr>');
        return buf.toString();
    }
    this.setInnerTableHtml = function() {
        for (var i = 1; i <= this.raceNo; i++) {
            this.jtcChild[i].setInnerTableHtml();
        }
    }
}

function JTComboChildTable(rNo) {
    this.raceNo = rNo;
    this.startSell = 0;
    this.sellStatus = '';
    this.id = '';
    this.tableId = '';
    this.selectLeg = new Array();
    this.tableSize = arrSize;
    this.tableObj = new Array(arrSize);
    this.displayFlagList; // array
    this.selectLeg = new Array();
    this.selectLeg['WIN'] = new Array(arrSize);
    this.selectLeg['PLA'] = new Array(arrSize);
    this.selectLeg['W-P'] = new Array(arrSize);
    this.selectField = new Array();
    this.selectField['WIN'] = 0;
    this.selectField['PLA'] = 0;
    this.selectField['W-P'] = 0;
    this.winOdds = new Array(arrSize);
    this.winColorInd = new Array(arrSize);
    this.plaOdds = new Array(arrSize);
    this.plaColorInd = new Array(arrSize);
    this.createBetObject = function(pool) {
        var betObj = new BetObject();
        for (var i = 0; i < this.selectLeg[pool].length; i++) {
            if (this.selectLeg[pool][i] == 1) {
                if (betObj.legNo > 0) betObj.legBuf.append('+');
                betObj.legBuf.append(i);
                betObj.legNo++;
            }
        }
        return betObj;
    }
    this.clearCheckBox = function(pool) {
        for (var i = 0; i < this.selectLeg[pool].length; i++) {
            this.selectLeg[pool][i] = 0;
        }
    }
    this.clearWinOdds = function() {
        for (var i = 1; i < arrSize; i++) {
            this.winOdds[i] = '';
            this.winColorInd[i] = 0;
        }
    }
    this.clearPlaOdds = function() {
        for (var i = 1; i < arrSize; i++) {
            this.plaOdds[i] = '';
            this.plaColorInd[i] = 0;
        }
    }
    this.displayCnt = function() {
        var cnt = 0;
        for (var i = 1; i <= this.tableSize; i++) {
            if (this.displayFlagList[i] == '1') cnt++;
        }
        return cnt++;
    }
    this.generateTable = function(styleIdx) {
        var buf = new StringBuffer();
        for (var i = 1; i <= this.tableSize; i++) {
            if (this.displayFlagList[i] != '1') continue;
            var subRowSize = this.tableObj[i].length;
            buf.append('<tr height="22px"><td class="').append(tbStyleDtls[styleIdx % 2]).append('" valign="middle" align="center" rowspan="').append(subRowSize).append('">').append(this.raceNo).append('</td>');
            buf.append('<td class="').append(tbStyleDtls[styleIdx % 2]).append('" valign="middle" align="center" rowspan="').append(subRowSize).append('">').append(i).append('</td>');
            this.tableObj[i][0].num = styleIdx;
            buf.append(getTableInnerRow(this.tableObj[i][0], '', false, false));
            buf.append('<td id="winCell').append(this.raceNo).append('_').append(i).append('" class="').append(tbStyleDtls[styleIdx % 2]).append('" valign="middle" rowspan="').append(subRowSize).append('"></td>');
            buf.append('<td id="plaCell').append(this.raceNo).append('_').append(i).append('" class="').append(tbStyleDtls[styleIdx % 2]).append('" valign="middle" rowspan="').append(subRowSize).append('"></td>');
            buf.append('<td id="wipCell').append(this.raceNo).append('_').append(i).append('" class="').append(tbStyleDtls[styleIdx % 2]).append('" valign="middle" align="center" rowspan="').append(subRowSize).append('"></td></tr>');
            for (var j = 1; j < subRowSize; j++) {
                this.tableObj[i][j].num = styleIdx;
                buf.append('<tr height="22">');
                buf.append(getTableInnerRow(this.tableObj[i][j], 'style="BORDER-TOP: #ffffff 1px solid;"', false, false));
                buf.append('</tr>');
            }
            styleIdx++;
        }
        if (this.displayCnt() > 0) buf.append('<tr><td colspan="10" bgcolor="#CCCCCC"><img src="/info/include/images/spacer.gif" width="1" height="1"></td></tr>');
        return buf.toString();
    };
    this.setInnerTableHtml = function() {
        for (var i = 1; i <= this.tableSize; i++) {
            if (this.displayFlagList[i] != '1') continue;
            var buf = new StringBuffer();
            if (enableBS) {
                // win checkbox
                var disabled = this.tableObj[i][0].hScr == '1' || this.startSell == 0 || this.sellStatus.indexOf('WIN') < 0;
                if (disabled) this.selectLeg['WIN'][i] = 0;
                buf.append('<input style="vertical-align:middle" type="checkbox" class="checkbox" onclick="mExcludeChkbox(').append(this.raceNo).append(', ').append(i).append(', \'WIN\');" ');
                buf.append((this.selectLeg['WIN'][i] == 1) ? 'checked ' : '');
                buf.append(disabled ? 'disabled' : '').append('>');
            }
            // prevent showing hf when ---
            if (!isNumericDash(this.winOdds[i])) this.winColorInd[i] = 0;
            if (!isNumericDash(this.plaOdds[i])) this.plaColorInd[i] = 0;
            // win odds
            if (this.winOdds[i] == 'SCR' || this.tableObj[i][0].hScr == '1') buf.append('<nobr>').append(scratchLbl).append('</nobr>');
            else if (this.winOdds[i] != null && this.startSell == 1 && this.sellStatus.indexOf('WIN') >= 0) buf.append('<a class="wpTdColor" style="color:').append(getOddsFgColor(this.winColorInd[i])).append(';background-color:').append(getOddsBgColor(this.winColorInd[i])).append('" href="javascript:processQuickBet(\'WIN\', \'' + this.raceNo + '\', ' + i + ')">' + this.winOdds[i] + '</a>');
            else buf.append('<span class="wpTdColor" style="color:').append(getOddsFgColor(this.winColorInd[i])).append(';background-color:').append(getOddsBgColor(this.winColorInd[i])).append('">').append(this.winOdds[i]).append('</span>');
            document.getElementById('winCell' + this.raceNo + '_' + i).style.backgroundColor = (this.selectLeg['WIN'][i] == 1) ? '#FFF4B0' : '';
            document.getElementById('winCell' + this.raceNo + '_' + i).innerHTML = buf.toString();
            buf = new StringBuffer();
            if (enableBS) {
                // pla checkbox
                var disabled = this.tableObj[i][0].hScr == '1' || this.startSell == 0 || this.sellStatus.indexOf('PLA') < 0;
                if (disabled) this.selectLeg['PLA'][i] = 0;
                buf.append('<input style="vertical-align:middle" type="checkbox" class="checkbox" onclick="mExcludeChkbox(').append(this.raceNo).append(', ').append(i).append(', \'PLA\');" ');
                buf.append((this.selectLeg['PLA'][i] == 1) ? 'checked ' : '');
                buf.append(disabled ? 'disabled' : '').append('>');
            }
            // pla odds
            if (this.plaOdds[i] == 'SCR' || this.tableObj[i][0].hScr == '1') buf.append('<nobr>').append(scratchLbl).append('<nobr>');
            else if (this.plaOdds[i] != null && this.startSell == 1 && this.sellStatus.indexOf('PLA') >= 0) buf.append('<a class="wpTdColor" style="color:').append(getOddsFgColor(this.plaColorInd[i])).append(';background-color:').append(getOddsBgColor(this.plaColorInd[i])).append('" href="javascript:processQuickBet(\'PLA\', \'' + this.raceNo + '\', ' + i + ')"><nobr>' + this.plaOdds[i] + '</nobr></a>');
            else buf.append('<span class="wpTdColor" style="color:').append(getOddsFgColor(this.plaColorInd[i])).append(';background-color:').append(getOddsBgColor(this.plaColorInd[i])).append('"><nobr>').append(this.plaOdds[i]).append('</nobr></span>');
            document.getElementById('plaCell' + this.raceNo + '_' + i).style.backgroundColor = (this.selectLeg['PLA'][i] == 1) ? '#FFF4B0' : '';
            document.getElementById('plaCell' + this.raceNo + '_' + i).innerHTML = buf.toString();
            buf = new StringBuffer();
            if (enableBS) {
                // W-P checkbox
                var disabled = this.tableObj[i][0].hScr == '1' || this.startSell == 0 || this.sellStatus.indexOf('W-P') < 0;
                if (disabled) this.selectLeg['W-P'][i] = 0;
                buf.append('<input type="checkbox" class="checkbox" onclick="mExcludeChkbox(').append(this.raceNo).append(', ').append(i).append(', \'W-P\');" ');
                buf.append((this.selectLeg['W-P'][i] == 1) ? 'checked ' : '');
                buf.append(disabled ? 'disabled' : '').append('>');
            }
            document.getElementById('wipCell' + this.raceNo + '_' + i).style.backgroundColor = (this.selectLeg['W-P'][i] == 1) ? '#FFF4B0' : '';
            document.getElementById('wipCell' + this.raceNo + '_' + i).innerHTML = buf.toString();
        }
    };
}
///////////////////////////////////////////////////
// Double Table
///////////////////////////////////////////////////
function DblTable(r1, r2) {
    this.race1 = r1;
    this.race2 = r2;
    this.tbClass = new Array('tableNum1DBL', 'tableNum2DBL');
    this.divId = '';
    this.dblOdds = new Array(arrSize);
    this.dblColorInd = new Array(arrSize);
    this.fieldSize1 = 14;
    this.fieldSize2 = 14;
    this.scratchList1 = null;
    this.scratchList2 = null;
    this.horseStatusList1 = null;
    this.horseStatusList2 = null;
    this.startSell = false;
    this.firstLegLbl = '';
    this.secondLegLbl = '';
    this.haveOdds = false;
    this.prevLbl = '';
    this.nextLbl = '';
    this.curPage = 1;
    for (var i = 1; i < this.dblOdds.length; i++) {
        this.dblOdds[i] = new Array('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
        this.dblColorInd[i] = new Array(arrSize);
    }
    this.setTableToDiv = function() {
        if (this.fieldSize1 > 14) document.getElementById('pagingDBL').innerHTML = genPagingDBL();
        document.getElementById(this.divId).innerHTML = this.generateTable();
    }
    this.clearTable = function() {
        for (var i = 1; i <= 24; i++) {
            for (var j = 1; j <= 24; j++) {
                this.dblOdds[i][j] = '';
                this.dblColorInd[i][j] = 0;
            }
        }
    }
    this.generateTable = function() {
        var allRefund = true;
        if (!this.haveOdds) {
            allRefund = false;
        } else {
            for (var i = 1; i <= 24; i++) {
                for (var j = 1; j <= 24; j++) {
                    if (this.dblOdds[i][j] != "" && this.dblOdds[i][j] != "---") {
                        allRefund = false;
                        break;
                    }
                }
            }
        }
        var buf = new StringBuffer();
        buf.append('<table width="100%" height="100%" border="0" cellspacing="1" cellpadding="0" bgcolor="#DDDCDC">');
        buf.append('<tr>');
        buf.append('<td width="42" align="center" class="tdColor1">').append(this.firstLegLbl).append('</td>');
        for (var i = 1; i <= 14; i++) {
            if ((this.curPage - 1) * 14 + i <= 24) buf.append('<td width="40" rowspan="2" align="center" class="tdColor1">').append(((this.curPage - 1) * 14 + i)).append('</td>');
            else buf.append('<td width="40" rowspan="2" align="center" class="tdColor1">&nbsp;</td>');
        }
        buf.append('</tr>');
        buf.append('<tr>');
        buf.append('<td align="center" class="tdColor2">').append(this.secondLegLbl).append('</td>');
        buf.append('</tr>');
        var rowCnt = (this.fieldSize2 > 14) ? 24 : 14;
        for (var i = 1; i <= rowCnt; i++) {
            buf.append('<tr>');
            buf.append('<td align="center" class="tdColor2">').append(i).append('</td>');
            for (var j = 1; j <= 14; j++) {
                var xAxis = (this.curPage - 1) * 14 + j;
                buf.append('<td align="center" class="').append(this.tbClass[i % 2]).append('">');
                if (!this.haveOdds || i > this.fieldSize2 || xAxis > this.fieldSize1) buf.append('');
                else {
                    var bHorseStats1 = this.horseStatusList1[xAxis].split('/');
                    var bHorseStats2 = this.horseStatusList2[i].split('/');
                    // s1 = 1st leg scratch; s2 = 2nd leg scratch
                    // r1 = 1st leg reserve; r2 = 2nd leg reserve
                    // sr1 = 1st leg reserve scratch; sr2 = 2nd leg reserve scratch
                    // n1 = 1st leg normal; n2 = 2nd leg normal
                    var s1 = this.scratchList1[xAxis] == '1';
                    var s2 = this.scratchList2[i] == '1';
                    var r1 = isAllReserve(bHorseStats1);
                    var r2 = isAllReserve(bHorseStats2);
                    var sr1 = s1 && r1;
                    var sr2 = s2 && r2;
                    var n1 = !s1 && !r1;
                    var n2 = !s2 && !r2;
                    // prevent showing hf when ---
                    if (!isNumericDash(this.dblOdds[xAxis][i])) {
                        this.dblColorInd[xAxis][i] = 0;
                    }
                    if (allRefund) buf.append('<span class="wpTdColor"><nobr>---</nobr></span>');
                    else if (this.dblOdds[xAxis][i] == 'SCR' || (n1 && s2) || (n2 && s1) || (n1 && sr2) || (n2 && sr1) || (s1 && sr2) || (s2 && sr1) || (s1 && s2) || (sr1 && sr2)) buf.append('<nobr>').append(scratchLbl).append('</nobr>');
                    else if (r1 || r2) buf.append('<span class="wpTdColor"><nobr>---</nobr></span>');
                    else if (this.dblOdds[xAxis][i] != null && ranRace < this.race1 && this.startSell) buf.append('<a class="tdColor" style="color:').append(getOddsFgColor(this.dblColorInd[xAxis][i])).append(';background-color:').append(getOddsBgColor(this.dblColorInd[xAxis][i])).append('" href="javascript:processQuickBet(\'DBL\', \'' + this.race1 + '\', ' + xAxis + ', ' + i + ')">' + this.dblOdds[xAxis][i] + '</a>');
                    else buf.append('<span class="tdColor" style="color:').append(getOddsFgColor(this.dblColorInd[xAxis][i])).append(';background-color:').append(getOddsBgColor(this.dblColorInd[xAxis][i])).append('">').append(this.dblOdds[xAxis][i]).append('</span>');
                }
                buf.append('</td>');
            }
            buf.append('</tr>');
        }
        buf.append('</table>');
        return buf.toString();
    }
}
///////////////////////////////////////////////////
// MultiLeg Table
///////////////////////////////////////////////////
function MultiLegTable(rNo) {
    this.raceNo = rNo;
    this.tbClass = new Array('tableNum2', 'tableNum1');
    this.divId = '';
    this.header = '';
    this.curFunc = 0; // 0 = banker 20, 1 = top 10 banker, 2 = all, 3 = allpre, 4 = investment
    this.rowSize = 24; // 5 = banker 20, 10 = top 10 banker, 12 = all, 24 = investment
    this.selectPool = '';
    this.selTable = new Array(this.rowSize);
    this.oddsTable = new Array(this.rowSize);
    this.horseList = new Array(this.rowSize);
    this.startSell = false;
    this.curPage = 1;
    this.noOfPage = 0;
    this.urlPara = '';
    this.qOdds = new Array(arrSize);
    this.qColorInd = new Array(arrSize);
    this.qFieldSize = 14;
    this.tableObj = new Array(arrSize);
    this.haveOdds = false;
    this.theNthPageLbl = '';
    this.prevLbl = '';
    this.nextLbl = '';
    this.numLbl = '';
    this.pos1stLbl = '';
    this.pos2ndLbl = '';
    this.pos3rdLbl = '';
    this.pos4thLbl = '';
    this.invGraphLbl = '';
    this.tableType = 'T'; // Q = QIN Table; T = Top 20, Banker or All
    for (var i = 0; i < this.selTable.length; i++) {
        this.selTable[i] = new Array('', '', '', '', '');
        this.oddsTable[i] = new Array('', '', '', '', '');
    }
    for (var i = 1; i < this.qOdds.length; i++) {
        this.qOdds[i] = new Array('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
        this.qColorInd[i] = new Array(arrSize);
    }
    this.clearTable = function() {
        if (this.tableType == 'T') {
            for (var i = 0; i < this.selTable.length; i++) {
                for (var j = 0; j < this.selTable[i].length; j++) {
                    this.selTable[i][j] = '';
                    this.oddsTable[i][j] = '';
                }
            }
        }
        if (this.tableType == 'Q') {
            for (var i = 1; i < this.qOdds.length; i++) {
                for (var j = 1; j < this.qOdds[i].length; j++) {
                    this.qOdds[i][j] = '';
                    this.qColorInd[i][j] = 0;
                }
            }
        }
    }
    this.setTableToDiv = function() {
        document.getElementById(this.divId).innerHTML = this.generateTable();
        document.getElementById('paging' + this.selectPool).style.display = 'block';
        switch (this.curFunc) {
            case 2:
            case 3:
                if (this.tableType == 'Q') document.getElementById('paging' + this.selectPool).style.display = 'none';
            case 1:
                if (this.tableType == 'T') document.getElementById('paging' + this.selectPool).innerHTML = genPaging(this.selectPool);
                break;
            default:
                document.getElementById('paging' + this.selectPool).style.display = 'none';
        }
    }
    this.generateTable = function() {
        if (this.tableType == 'Q') return this.generateTableQ();
        if (this.tableType == 'T')
            if (this.curFunc == 4) return this.generateTableInvest();
            else return this.generateTableT();
        return '';
    }
    this.generateTableT = function() {
        var buf = new StringBuffer();
        var startIdx = (this.curPage - 1) * 4 + 1;
        buf.append('<table width="100%" border="0" cellspacing="0" cellpadding="2" bgcolor="#DDDCDC" style="border:1px solid #CCCCCC;">');
        buf.append('<tr><td height="25" align="center" class="tdColor1" colspan="8">').append(this.header);
        if (this.curFunc == 2 || this.curFunc == 3) buf.append(' ').append(this.theNthPageLbl.replace('#', display_number[this.curPage]))
        buf.append('</td></tr>');
        if (this.curFunc == 1) {
            buf.append('<tr>');
            for (var j = 0; j < 4; j++) {
                buf.append('<td align="center" class="tableContentHead" colspan="2" style="border-right:1px solid #CCCCCC;">');
                if (this.tableObj[startIdx + j] != null && this.tableObj[startIdx + j][0].hName != null) {
                    buf.append(startIdx + j).append(' ');
                    if (!isOverseaMeeting)
                    // START Nielsen Online SiteCensus
                    //buf.append('<a href="javascript:goHorseRecord2(\'').append(jcewUrlLbl)
                        buf.append('<a href="javascript:WACommonTagging(\'horse\');goHorseRecord2(\'').append(jcewUrlLbl).append('\', \'').append(this.tableObj[startIdx + j][0].hCode).append('\');">');
                    // END Nielsen Online SiteCensus
                    for (var i = 0; i < this.tableObj[startIdx + j].length; i++) {
                        if (i > 0) buf.append(' /<br>');
                        if (isOverseaMeeting && this.tableObj[startIdx + j][i].hCode != '') buf.append('<nobr>(').append(this.tableObj[startIdx + j][i].hCode).append(')</nobr>');
                        if (this.tableObj[startIdx + j][i].hName != '') buf.append(this.tableObj[startIdx + j][i].hName);
                        else buf.append('-');
                        if (this.tableObj[startIdx + j][i].hStat.indexOf('R') >= 0) buf.append('<nobr>(').append(reserveLbl).append(')</nobr>');
                        if (this.tableObj[startIdx + j][i].hStat.indexOf('S') >= 0) buf.append('<nobr>(').append(scratchLbl).append(')</nobr>');
                    }
                    if (!isOverseaMeeting) buf.append('</a>');
                }
                buf.append('</td>');
            }
            buf.append('</tr>');
        }
        for (var i = 0; i < this.rowSize; i++) {
            buf.append('<tr>');
            for (var j = 0; j < 4; j++) {
                var hideReserve = false;
                var hideScratch = false;
                if (this.curFunc == 1 && this.tableObj[startIdx + j] != null) {
                    hideReserve = isBracketReserveOrScratch(this.tableObj[startIdx + j]);
                    hideScratch = this.tableObj[startIdx + j][0].hScr == '1';
                }
                buf.append('<td width="17%" class="').append(this.tbClass[i % 2]).append('" style="border-right:1px solid #FFFFFF;"><nobr><strong>&nbsp;');
                if (hideReserve || hideScratch) buf.append('');
                else buf.append(this.selTable[i][j]);
                buf.append('</strong></nobr></td>');
                buf.append('<td width="8%" class="').append(this.tbClass[i % 2]).append('" style="border-right:1px solid #CCCCCC;" align="center">');
                if (hideReserve || hideScratch) buf.append('');
                else if (this.oddsTable[i][j] != null && this.oddsTable[i][j] != 'SCR' && this.oddsTable[i][j] != '---' && ranRace < this.raceNo && this.startSell) buf.append('<a href="javascript:processQuickBet(\'').append(this.selectPool).append('\', \'').append(this.raceNo).append('\', \'').append(this.selTable[i][j]).append('\')" class="tableNum">').append(this.oddsTable[i][j]).append('</a>');
                else if (this.oddsTable[i][j] == 'SCR') buf.append(scratch2Lbl);
                else buf.append(this.oddsTable[i][j]);
                buf.append('</td>');
            }
            buf.append('</tr>');
        }
        buf.append('</table>');
        return buf.toString();
    }
    this.generateTableInvest = function() {
        var col = (this.selectPool == "QTT" ? 5 : 4);
        var buf = new StringBuffer();
        buf.append('<table width="100%" border="0" cellspacing="0" cellpadding="2" bgcolor="#DDDCDC" style="border:1px solid #CCCCCC;">');
        buf.append('<tr><td height="25" align="center" class="tdColor1" colspan="' + col + '">').append(this.header).append('</td></tr>');
        //Header
        buf.append('<tr>');
        buf.append('<td align="center" class="tableContentHead" style="border-right:1px solid #CCCCCC;">');
        buf.append(this.numLbl).append('</td>');
        buf.append('<td align="center" class="tableContentHead" style="border-right:1px solid #CCCCCC;">');
        buf.append(this.pos1stLbl).append('</td>');
        buf.append('<td align="center" class="tableContentHead" style="border-right:1px solid #CCCCCC;">');
        buf.append(this.pos2ndLbl).append('</td>');
        buf.append('<td align="center" class="tableContentHead" style="border-right:1px solid #CCCCCC;">');
        buf.append(this.pos3rdLbl).append('</td>');
        if (this.selectPool == "QTT") {
            buf.append('<td align="center" class="tableContentHead" style="border-right:1px solid #CCCCCC;">');
            buf.append(this.pos4thLbl).append('</td>');
        }
        buf.append('</tr>');
        //Body
        for (var i = 0; i < this.rowSize; i++) {
            buf.append('<tr>');
            buf.append('<td width="12%" class="').append(this.tbClass[i % 2]).append('" style="border-right:1px solid #CCCCCC;" align="center">');
            buf.append(this.replaceIfEmpty(this.oddsTable[i][0], i + 1)).append('</td>');
            for (var j = 1; j < col; j++) {
                buf.append('<td width="*" class="').append(this.tbClass[i % 2]).append('" style="border-right:1px solid #CCCCCC;" align="center">');
                var displayVal = '';
                if (this.oddsTable[i][j] == 'SCR') displayVal = scratchLbl;
                else if (this.oddsTable[i][j] == '---') displayVal = reserveLbl;
                else if (this.oddsTable[i][j] == '------') displayVal = ""; //show nothing for overflow
                else if (!(this.oddsTable[i][j] === "")) displayVal = '$' + addComma(this.oddsTable[i][j]);
                buf.append(this.replaceIfEmpty(displayVal, "&nbsp")).append('</td>');
            }
            buf.append('</tr>');
        }
        buf.append('</table>');
        //Link to graph
        if (this.selectPool != "QTT" || !merged) {
            buf.append('<div style="margin:5px" align="right"><span id="spanShowInvChart" onclick="javascript:showInvChart();"><a href="javascript:;">').append(this.invGraphLbl).append('</a></span></div>');
        }
        return buf.toString();
    }
    this.replaceIfEmpty = function(str, replaceStr) {
        if (str || str.length > 0) return str;
        else return replaceStr;
    }
    this.generateTableQ = function() {
        var allRefund = true;
        if (!this.haveOdds) {
            allRefund = false;
        } else {
            for (var i = 1; i <= 23; i++) {
                for (var j = i + 1; j <= 24; j++) {
                    if (this.qOdds[i][j] != "" && this.qOdds[i][j] != "---") {
                        allRefund = false;
                        break;
                    }
                }
            }
        }
        var buf = new StringBuffer();
        buf.append('<table width="100%" border="0" cellpadding="0" cellspacing="0">');
        buf.append('<tr>');
        buf.append('<td width="56" colspan="3" class="tdColorHead" style="PADDING-LEFT:5px;border:1px solid #dddcdc"><strong>').append(this.header).append('</strong></td>');
        for (var i = 2; i <= 14; i++) buf.append('<td width="18" align="center" class="tdColorNum1" style="border-top:1px solid #dddcdc;border-right:1px solid #dddcdc;border-bottom:1px solid #dddcdc;">').append(i).append('</td>');
        buf.append('<td width="18" align="center" class="tdColorNum1" style="border-top:1px solid #dddcdc;border-right:1px solid #dddcdc;border-bottom:1px solid #dddcdc;">&nbsp;</td>');
        buf.append('</tr>');
        for (var i = 0; i < 7; i++) {
            var x = 8 + i;
            var y = 1 + i;
            buf.append('<tr>');
            buf.append('<td align="center" width="18" class="tdColorNum1" style="border-left:1px solid #dddcdc;border-right:1px solid #dddcdc;border-bottom:1px solid #dddcdc;">').append((x > 8) ? x : '').append('</td>');
            for (var j = 8; j < x; j++) {
                buf.append('<td align="center" width="18" class="tdColorNum2" style="border-right:1px solid #dddcdc;border-bottom:1px solid #dddcdc;">');
                if (!this.haveOdds || j > this.qFieldSize || x > this.qFieldSize) buf.append('&nbsp;');
                else {
                    // s1 = 1st leg scratch; s2 = 2nd leg scratch
                    // r1 = 1st leg reserve; r2 = 2nd leg reserve
                    // sr1 = 1st leg reserve scratch; sr2 = 2nd leg reserve scratch
                    // n1 = 1st leg normal; n2 = 2nd leg normal
                    var s1 = this.tableObj[j][0].hScr == '1';
                    var s2 = this.tableObj[x][0].hScr == '1';
                    var r1 = isBracketReserveOrScratch(this.tableObj[j]);
                    var r2 = isBracketReserveOrScratch(this.tableObj[x]);
                    var sr1 = s1 && r1;
                    var sr2 = s2 && r2;
                    var n1 = !s1 && !r1;
                    var n2 = !s2 && !r2;
                    // prevent showing hf when ---
                    if (!isNumericDash(this.qOdds[j][x])) this.qColorInd[j][x] = 0;
                    if (allRefund) buf.append('<span class="wpTdColor"><nobr>---</nobr></span>');
                    else if (this.qOdds[j][x] == 'SCR' || (n1 && s2) || (n2 && s1) || (n1 && sr2) || (n2 && sr1) || (s1 && sr2) || (s2 && sr1) || (s1 && s2) || (sr1 && sr2)) buf.append(scratch2Lbl);
                    else if (r1 || r2) buf.append('-');
                    else if (this.qOdds[j][x] != null && ranRace < this.raceNo && this.startSell) buf.append('<a class="tdColor" style="color:').append(getOddsFgColor(this.qColorInd[j][x])).append(';background-color:').append(getOddsBgColor(this.qColorInd[j][x])).append('" href="javascript:processQuickBet(\'').append(this.selectPool).append('\', \'' + this.raceNo + '\', \'' + j + '-' + x + '\')">' + this.qOdds[j][x] + '</a>');
                    else buf.append('<span class="tdColor" style="color:').append(getOddsFgColor(this.qColorInd[j][x])).append(';background-color:').append(getOddsBgColor(this.qColorInd[j][x])).append('">').append(this.qOdds[j][x]).append('</span>');
                }
                buf.append('</td>');
            }
            buf.append('<td align="center" width="18" class="tdColorNum1" style="border-right:1px solid #dddcdc;border-bottom:1px solid #dddcdc;">').append(x).append('</td>');
            buf.append('<td align="center" width="18" class="tdColorNum1" style="border-right:1px solid #dddcdc;border-bottom:1px solid #dddcdc;">').append(y).append('</td>');
            for (var j = y + 1; j <= 14; j++) {
                buf.append('<td align="center" width="18" class="tdColorNum2" style="border-right:1px solid #dddcdc;border-bottom:1px solid #dddcdc;">');
                if (!this.haveOdds || y > this.qFieldSize || j > this.qFieldSize) buf.append('&nbsp;');
                else {
                    // s1 = 1st leg scratch; s2 = 2nd leg scratch
                    // r1 = 1st leg reserve; r2 = 2nd leg reserve
                    // sr1 = 1st leg reserve scratch; sr2 = 2nd leg reserve scratch
                    // n1 = 1st leg normal; n2 = 2nd leg normal
                    var s1 = this.tableObj[y][0].hScr == '1';
                    var s2 = this.tableObj[j][0].hScr == '1';
                    var r1 = isBracketReserveOrScratch(this.tableObj[y]);
                    var r2 = isBracketReserveOrScratch(this.tableObj[j]);
                    var sr1 = s1 && r1;
                    var sr2 = s2 && r2;
                    var n1 = !s1 && !r1;
                    var n2 = !s2 && !r2;
                    // prevent showing hf when ---
                    if (!isNumericDash(this.qOdds[y][j])) this.qColorInd[y][j] = 0;
                    if (allRefund) buf.append('<span class="wpTdColor"><nobr>---</nobr></span>');
                    else if (this.qOdds[y][j] == 'SCR' || (n1 && s2) || (n2 && s1) || (n1 && sr2) || (n2 && sr1) || (s1 && sr2) || (s2 && sr1) || (s1 && s2) || (sr1 && sr2)) buf.append(scratch2Lbl);
                    else if (r1 || r2) buf.append('-');
                    else if (this.qOdds[y][j] != null && ranRace < this.raceNo && this.startSell) buf.append('<a class="tdColor" style="color:').append(getOddsFgColor(this.qColorInd[y][j])).append(';background-color:').append(getOddsBgColor(this.qColorInd[y][j])).append('" href="javascript:processQuickBet(\'').append(this.selectPool).append('\', \'' + this.raceNo + '\', \'' + y + '-' + j + '\')">' + this.qOdds[y][j] + '</a>');
                    else buf.append('<span class="tdColor" style="color:').append(getOddsFgColor(this.qColorInd[y][j])).append(';background-color:').append(getOddsBgColor(this.qColorInd[y][j])).append('">').append(this.qOdds[y][j]).append('</span>');
                }
                buf.append('</td>');
            }
            buf.append('<td align="center" width="18" class="tdColorNum1" style="border-right:1px solid #dddcdc;border-bottom:1px solid #dddcdc;">').append(y).append('</td>');
            buf.append('</tr>');
        }
        if (this.qFieldSize > 14) buf.append(this.generateTableQ24());
        buf.append('</table>');
        return buf.toString();
    }
    this.generateTableQ24 = function() {
        var allRefund = true;
        if (!this.haveOdds) {
            allRefund = false;
        } else {
            for (var i = 1; i <= 23; i++) {
                for (var j = i + 1; j <= 24; j++) {
                    if (this.qOdds[i][j] != "" && this.qOdds[i][j] != "---") {
                        allRefund = false;
                        break;
                    }
                }
            }
        }
        var buf = new StringBuffer();
        buf.append('<tr><td colspan="17" style="border-collapse:collapse;background-color:#FFFFFF" height="10px"></td></tr>');
        buf.append('<tr>');
        buf.append('<td width="18" align="center" class="tdColorNum1" style="border:1px solid #dddcdc" >&nbsp;</td>');
        for (var j = 15; j <= 24; j++) buf.append('<td width="18" align="center" class="tdColorNum1" style="border-top:1px solid #dddcdc;border-right:1px solid #dddcdc;border-bottom:1px solid #dddcdc;">').append(j).append('</td>');
        buf.append('<td width="18" align="center" class="tdColorNum1" style="border-top:1px solid #dddcdc;border-right:1px solid #dddcdc;border-bottom:1px solid #dddcdc;">&nbsp;</td>');
        buf.append('</tr>');
        for (var i = 1; i <= 23; i++) {
            buf.append('<tr>');
            buf.append('<td width="18" align="center" class="tdColorNum1" style="border-left:1px solid #dddcdc;border-right:1px solid #dddcdc;border-bottom:1px solid #dddcdc;">').append(i).append('</td>');
            for (var j = 15; j <= 24; j++) {
                buf.append('<td align="center" width="18" class="tdColorNum2" style="border-right:1px solid #dddcdc;border-bottom:1px solid #dddcdc;">');
                if (!this.haveOdds || this.qOdds[i][j] == '' || i > this.qFieldSize || j > this.qFieldSize) buf.append('&nbsp;');
                else {
                    // s1 = 1st leg scratch; s2 = 2nd leg scratch
                    // r1 = 1st leg reserve; r2 = 2nd leg reserve
                    // sr1 = 1st leg reserve scratch; sr2 = 2nd leg reserve scratch
                    // n1 = 1st leg normal; n2 = 2nd leg normal
                    var s1 = this.tableObj[i][0].hScr == '1';
                    var s2 = this.tableObj[j][0].hScr == '1';
                    var r1 = isBracketReserveOrScratch(this.tableObj[i]);
                    var r2 = isBracketReserveOrScratch(this.tableObj[j]);
                    var sr1 = s1 && r1;
                    var sr2 = s2 && r2;
                    var n1 = !s1 && !r1;
                    var n2 = !s2 && !r2;
                    // prevent showing hf when ---
                    if (!isNumericDash(this.qOdds[i][j])) this.qColorInd[i][j] = 0;
                    if (allRefund) buf.append('<span class="wpTdColor"><nobr>---</nobr></span>');
                    else if (this.qOdds[i][j] == 'SCR' || (n1 && s2) || (n2 && s1) || (n1 && sr2) || (n2 && sr1) || (s1 && sr2) || (s2 && sr1) || (s1 && s2) || (sr1 && sr2)) buf.append(scratch2Lbl);
                    else if (r1 || r2) buf.append('-');
                    else if (this.qOdds[i][j] != null && ranRace < this.raceNo && this.startSell) buf.append('<a class="tdColor" style="color:').append(getOddsFgColor(this.qColorInd[i][j])).append(';background-color:').append(getOddsBgColor(this.qColorInd[i][j])).append('" href="javascript:processQuickBet(\'').append(this.selectPool).append('\', \'' + this.raceNo + '\', \'' + i + '-' + j + '\')">' + this.qOdds[i][j] + '</a>');
                    else buf.append('<span class="tdColor" style="color:').append(getOddsFgColor(this.qColorInd[i][j])).append(';background-color:').append(getOddsBgColor(this.qColorInd[i][j])).append('">').append(this.qOdds[i][j]).append('</span>');
                }
                buf.append('</td>');
            }
            buf.append('<td width="18" align="center" class="tdColorNum1" style="border-right:1px solid #dddcdc;border-bottom:1px solid #dddcdc;">').append(i).append('</td>');
            buf.append('</tr>');
        }
        return buf.toString();
    }
}
///////////////////////////////////////////////////
// JKC Table
///////////////////////////////////////////////////
function JkcTable() {
    this.tableSize = 25;
    this.startSell = 0;
    this.joStatus = new Array(this.tableSize + 1);
    this.sellStatus = new Array(this.tableSize + 1);
    this.divId = '';
    this.jockeyNumList;
    this.jockeyNameList; // array
    this.jockeyCodeList; // array
    this.selectLeg = new Array(this.tableSize + 1);
    this.jkcRefOdds = new Array(this.tableSize + 1);
    this.jkcPrevOdds = new Array(this.tableSize + 1);
    this.jkcLastOdds = new Array(this.tableSize + 1);
    this.jkcPts = new Array(this.tableSize + 1);
    this.jkcScheduleRides = new Array(this.tableSize + 1);
    this.jkcRemainingRides = new Array(this.tableSize + 1);
    this.displayOpOdds = false;
    this.displayJkcPts = false;
    this.displayPrevOdds = false;
    this.displayScheduleRides = false;
    this.displayRemainingRides = false;
    this.otherSelNo = 0;
    this.lblJockeyNum = '';
    this.lblJockeyName = '';
    this.lblJkcPts = '';
    this.lblOpOdds = '';
    this.lblPrevOdds = '';
    this.lblLastOdds = '';
    this.lblRfd = '';
    this.lblLse = '';
    this.lblScheduleRides = '';
    this.lblRemainingRides = '';
    this.fieldSize = function() {
        return this.jockeyNameList.length - 1;
    }
    this.clearCheckBox = function() {
        for (var i = 0; i < this.selectLeg.length; i++) {
            this.selectLeg[i] = 0;
        }
    }
    this.clearJkcLastOdds = function() {
        for (var i = 0; i < this.jkcLastOdds.length; i++) {
            this.jkcLastOdds[i] = '';
        }
    }
    this.createBetObject = function() {
        var betObj = new NoveltyBetObject();
        for (var i = 0; i < this.selectLeg.length; i++) {
            if (this.selectLeg[i] == 1) {
                if (betObj.legNo > 0) betObj.legBuf.append('+');
                betObj.legBuf.append(this.jockeyNumList[i]).append('@').append(this.jkcLastOdds[i]);
                betObj.legNo++;
            }
        }
        return betObj;
    }
    this.getJockeyNameByNum = function(sNum) {
        for (var i = 1; i < this.jockeyNameList.length; i++) {
            if (sNum == this.jockeyNumList[i]) return this.jockeyNameList[i].replace('\\\'', '\'');
        }
        return '';
    }
    this.setTableToDiv = function() {
        document.getElementById(this.divId).innerHTML = this.generateTable();
    }
    this.generateTable = function() {
        var buf = new StringBuffer();
        var otherDetailBuf = new StringBuffer();
        // table header
        buf.append('<table cellSpacing="0" cellPadding="0" width="100%" border="0">');
        buf.append('<tr>');
        buf.append('<td class="tableContentHead" align="center" width="15%">').append(this.lblJockeyNum).append('</td>');
        buf.append('<td class="tableContentHead">').append(this.lblJockeyName).append('</td>');
        if (this.displayJkcPts) buf.append('<td class="tableContentHead" align="center" width="15%">').append(this.lblJkcPts).append('</td>');
        if (this.displayScheduleRides) buf.append('<td class="tableContentHead" align="center" width="15%">').append(this.lblScheduleRides).append('</td>');
        if (this.displayRemainingRides) buf.append('<td class="tableContentHead" align="center" width="15%">').append(this.lblRemainingRides).append('</td>');
        if (this.displayOpOdds) buf.append('<td class="tableContentHead" align="center" width="15%">').append(this.lblOpOdds).append('</td>');
        if (this.displayPrevOdds) buf.append('<td class="tableContentHead" align="center" width="15%">').append(this.lblPrevOdds).append('</td>');
        buf.append('<td class="tableContentHead" style="PADDING-LEFT: 5px" align="center" width="18%">').append(this.lblLastOdds).append('</td>');
        buf.append('</tr>');
        for (var i = 1; i < this.jockeyNameList.length; i++) {
            buf.append('<tr><td align="center" class="').append(tbStyle[i % 2]).append('">').append(this.jockeyNumList[i]).append('</td>');
            // START Nielsen Online SiteCensus
            //buf.append('<td class="').append(tbStyle[i%2]).append('">').append('<a href="javascript:goJockeyRecord2(\'')
            buf.append('<td class="').append(tbStyle[i % 2]).append('">').append('<a href="javascript:WACommonTagging(\'jockey\');goJockeyRecord2(\'').append(jcewUrlLbl).append('\', \'').append(this.jockeyCodeList[i]).append('\', ').append(this.jockeyNumList[i] == this.otherSelNo).append(');">').append('<span class="hkscsfontfamily">').append(this.jockeyNameList[i].replace('\\\'', '\'')).append('</span>').append('</a>').append('</td>');
            // END Nielsen Online SiteCensus
            if (this.displayJkcPts) buf.append('<td align="center" class="').append(tbStyle[i % 2]).append('">').append(this.jkcPts[i] == '-1' ? '---' : this.jkcPts[i]).append('</td>');
            if (otherDetailEnable && this.jockeyNumList[i] == this.otherSelNo) {
                //var detail = this.generateOtherDetailTable();
                otherDetailBuf.append("<a href=\"javascript:;\" onclick=\"isOtherDetailMouseOver=false;Tip(")
                    //otherDetailBuf.append(detail);
                    .append("generateOtherDetailTable(").append("stage, ").append("'").append(this.lblOtherJockey).append("', ").append("'").append(this.lblOtherPoint).append("', ").append("'").append(this.lblScheduleRides).append("', ").append("'").append(this.lblRemainingRides).append("', jcewUrl, jkcOtherData, false)").append(", OFFSETX, ").append(stage == 5 ? "-300" : "-250").append(", ABOVE, true, BORDERWIDTH, 0, BGCOLOR, '', PADDING, 0, CLICKCLOSE, true, CLICKSTICKY, true, FOLLOWMOUSE, false, DELAY, 0)\" id=\"jkcDetail\">").append(this.lblOtherDetail).append("</a>");
            }
            if (this.displayScheduleRides) buf.append('<td align="center" class="').append(tbStyle[i % 2]).append('">').append(otherDetailEnable && this.jockeyNumList[i] != this.otherSelNo ? this.jkcScheduleRides[i] : otherDetailBuf.toString()).append('</td>');
            if (this.displayRemainingRides) buf.append('<td align="center" class="').append(tbStyle[i % 2]).append('">').append(otherDetailEnable && this.jockeyNumList[i] != this.otherSelNo ? this.jkcRemainingRides[i] : otherDetailBuf.toString()).append('</td>');
            if (this.displayOpOdds) {
                buf.append('<td align="center" class="').append(tbStyle[i % 2]).append('">');
                if (this.jkcRefOdds[i] == 'LSE') buf.append('<nobr>').append(this.lblLse).append('</nobr>');
                else if (this.jkcRefOdds[i] == 'RFD') buf.append('<nobr>').append(this.lblRfd).append('</nobr>');
                else buf.append(this.jkcRefOdds[i])
                buf.append('</td>');
            }
            if (this.displayPrevOdds) {
                buf.append('<td align="center" class="').append(tbStyle[i % 2]).append('">');
                if (this.jkcPrevOdds[i] == 'LSE' || this.joStatus[i] == '2') buf.append('<nobr>').append(this.lblLse).append('</nobr>');
                else if (this.jkcPrevOdds[i] == 'RFD' || this.joStatus[i] == '3') buf.append('<nobr>').append(this.lblRfd).append('</nobr>');
                else buf.append(handleEmptyStr(this.jkcPrevOdds[i]));
                buf.append('</td>')
            }
            var disabled = this.startSell == 0 || this.sellStatus[i] != '1';
            if (disabled) this.selectLeg[i] = 0;
            buf.append('<td class="').append(tbStyle[i % 2]).append('" style="background-color:').append((this.selectLeg[i] == 1) ? '#FFF4B0' : '').append('">');
            buf.append('<table cellspacing="0" cellpadding="0" border="0" width="100%"><tr><td width="20%">');
            if (enableBS) {
                buf.append('<input type="checkbox" class="checkbox" onclick="jkcLegClick(').append(i).append(');" ')
                buf.append((this.selectLeg[i] == 1) ? 'checked ' : '');
                buf.append(disabled ? 'disabled' : '').append('>');
            }
            buf.append('</td><td width="80%" align="center">');
            if (this.jkcLastOdds[i] == 'LSE' || this.joStatus[i] == '2') buf.append('<nobr>').append(this.lblLse).append('</nobr>');
            else if (this.jkcLastOdds[i] == 'RFD' || this.joStatus[i] == '3') buf.append('<nobr>').append(this.lblRfd).append('</nobr>');
            else if (this.startSell == 1 && this.joStatus[i] == '1' && this.sellStatus[i] == '1') buf.append('<a class="wpTdColor" style="color:#000000" href="javascript:processQuickBet(\'JKC\', \'').append(this.jockeyNumList[i]).append('@').append(this.jkcLastOdds[i]).append('\')">').append(this.jkcLastOdds[i]).append('</a>');
            else buf.append((this.sellStatus[i] == '1' && isNumeric(this.jkcLastOdds[i])) ? this.jkcLastOdds[i] : '---');
            buf.append('</td></tr></table>');
            buf.append('</td>');
            buf.append('</tr>');
        }
        buf.append('<tr><td colspan="6" bgcolor="#4A8CC1" style="border-bottom:10px solid #FFFFFF;"><img src="/info/include/images/spacer.gif" width="1" height="3"></td></tr>');
        buf.append('</table>');
        return buf.toString();
    }
}

function generateOtherDetailTable(stage, lblOtherJockey, lblJkcPts, lblScheduleRides, lblRemainingRides, jcewUrl, jkcOtherData, isResultPage) {
    //alert(jkcOtherData);
    var buf = new StringBuffer();
    if (jkcOtherData != undefined && jkcOtherData != "" && jkcOtherData.length == 5) {
        buf.append('<table class=\'jkcOtherDetail\' >');
        buf.append('<tr>');
        buf.append('<td class=\'otherJockeyHeader\'>');
        buf.append(lblOtherJockey);
        if (stage == 5) {
            buf.append('</td>');
            buf.append('<td class=\'jkcPtsHeader\'>');
            buf.append(lblJkcPts);
            buf.append('</td>');
            if (!isResultPage) {
                buf.append('<td class=\'remainingRidesHeader\'>');
                buf.append(lblRemainingRides);
                buf.append('</td>');
            }
        } else {
            buf.append('</td>');
            buf.append('<td class=\'scheduleRidesHeader\'>');
            buf.append(lblScheduleRides);
            buf.append('</td>');
        }
        buf.append('<td class=\'otherJockeyHeader\'>');
        buf.append(lblOtherJockey);
        buf.append('</td>');
        if (stage == 5) {
            buf.append('</td>');
            buf.append('<td class=\'jkcPtsHeader\'>');
            buf.append(lblJkcPts);
            buf.append('</td>');
            if (!isResultPage) {
                buf.append('<td class=\'remainingRidesHeader\'>');
                buf.append(lblRemainingRides);
                buf.append('</td>');
            }
        } else {
            buf.append('</td>');
            buf.append('<td class=\'scheduleRidesHeader\'>');
            buf.append(lblScheduleRides);
            buf.append('</td>');
        }
        buf.append('</tr>');
        try {
            var jockyName = jkcOtherData[0].split('|');
            var jockyCode = jkcOtherData[1].split('|');
            var jockyPoints = jkcOtherData[2].split('|');
            var scheduleRides = jkcOtherData[3].split('|');
            var remainingRides = jkcOtherData[4].split('|');
            var row = parseInt((jockyName.length - 1) / 2) + ((jockyName.length - 1) % 2);
            for (i = 1; i <= row; i++) {
                buf.append('<tr>');
                buf.append('<td>');
                buf.append('<a href="javascript:goJockeyRecord2(\'');
                buf.append(jcewUrl).append('\', \'').append(jockyCode[i]).append('\', false);" >');
                buf.append(jockyName[i]);
                buf.append('</a>');
                buf.append('</td>');
                if (stage == 5) {
                    buf.append('<td class=\'detailCenter\'>');
                    buf.append(jockyPoints[i]);
                    buf.append('</td>');
                    if (!isResultPage) {
                        buf.append('<td class=\'detailCenter\'>');
                        buf.append(remainingRides[i]);
                        buf.append('</td>');
                    }
                } else {
                    buf.append('<td class=\'detailCenter\'>');
                    buf.append(scheduleRides[i]);
                    buf.append('</td>');
                }
                buf.append('<td>');
                buf.append('<a href="javascript:goJockeyRecord2(\'');
                buf.append(jcewUrl).append('\', \'').append(jockyCode[row + i]).append('\', false);" >');
                buf.append(jockyName[row + i] == undefined ? "" : jockyName[row + i]);
                buf.append('</a>');
                buf.append('</td>');
                if (stage == 5) {
                    buf.append('<td class=\'detailCenter\'>');
                    buf.append(jockyPoints[row + i] == undefined ? "" : jockyPoints[row + i]);
                    buf.append('</td>');
                    if (!isResultPage) {
                        buf.append('<td class=\'detailCenter\'>');
                        buf.append(remainingRides[row + i] == undefined ? "" : remainingRides[row + i]);
                        buf.append('</td>');
                    }
                } else {
                    buf.append('<td class=\'detailCenter\'>');
                    buf.append(scheduleRides[row + i] == undefined ? "" : scheduleRides[row + i]);
                    buf.append('</td>');
                }
                buf.append('</tr>');
            }
        } catch (e) {}
        buf.append('</table>');
    } else {
        buf.append('');
    }
    return buf.toString();
}

function jkcLegClick(i) {
    if (jTable.selectLeg[i] != 1) jTable.selectLeg[i] = 1;
    else jTable.selectLeg[i] = 0;
    jTable.setTableToDiv();
    if (isEditBetMode && typeof openEditOddsContent == 'function') {
        openEditOddsContent();
    }
}
///////////////////////////////////////////////////
// Cwin All Race Allup Checkbox Object
///////////////////////////////////////////////////
function CwinAllupTable(totalRaces) {
    this.raceNo = totalRaces;
    this.cwinChild = new Array(this.raceNo + 1);
    this.raceNumLbl = '';
    this.horseNumLbl = '';
    this.horseColorLbl = '';
    this.horseNameLbl = '';
    this.barDrawLbl = '';
    this.handicapLbl = '';
    this.jockeyLbl = '';
    this.trainerLbl = '';
    this.winLbl = '';
    this.plaLbl = '';
    this.wipLbl = '';
    this.compExist = [false, false, false, false];
    this.compSelected = [false, false, false, false];
    this.compName = ['', '', '', ''];
    this.generateTable = function() {
        var buf = new StringBuffer();
        buf.append('<table width="100%" border="0" cellspacing="0" cellpadding="0" style="table-layout: fixed; border-bottom:1px solid #CCCCCC; margin-bottom: 10px;">');
        buf.append(this.printCwinAllupHeader());
        for (var i = 1; i <= this.raceNo; i++) {
            buf.append(this.cwinChild[i].generateTable(i));
        }
        buf.append('</table>');
        document.getElementById('detailWPTable').innerHTML = buf.toString();
    }
    this.printCwinAllupHeader = function() {
        var buf = new StringBuffer();
        buf.append('<tr><td class="tableContentHead cwinHeader" align="center" valign="top" width="10%" nowrap>').append(this.raceNumLbl).append('</td>');
        buf.append('<td class="tableContentHead cwinHeader cwinCol1" id="cwinHeader1" align="center" valign="top" >').append('A1<div id="cwinHead1"></div>').append('</td>');
        buf.append('<td class="tableContentHead cwinHeader cwinCol2" id="cwinHeader2" align="center" valign="top" >').append('A2<div id="cwinHead2"></div>').append('</td>');
        buf.append('<td class="tableContentHead cwinHeader cwinCol3" id="cwinHeader3" align="center" valign="top" >').append('A3<div id="cwinHead3"></div>').append('</td>');
        buf.append('<td class="tableContentHead cwinHeader cwinCol4" id="cwinHeader4" align="center" valign="top" >').append('A4<div id="cwinHead4"></div>').append('</td>');
        buf.append('<td class="tableContentHead cwinHeader" align="center" width="10%" nowrap>').append("&nbsp;").append('</td></tr>');
        return buf.toString();
    }
    this.updateCwinTableDisplay = function() {
        var totalNoOfComp = MAX_NO_OF_CWA_COMP;
        for (var i = 0; i < MAX_NO_OF_CWA_COMP; i++) {
            if (this.compExist[i]) {
                // If all composite desciption of composites are same, it shall display the composite description under the comp label.
                if (this.compName[i] != '') {
                    $('#cwinHead' + (i + 1)).html(this.compName[i]);
                }
            } else {
                // hide the col with no composites
                $('.cwinCol' + (i + 1)).hide();
                totalNoOfComp--;
            }
        }
        $('.cwinExpandTd').attr('colspan', 2 + totalNoOfComp);
    }
    this.checkCompSelected = function(expandedRace) {
        this.compSelected = [false, false, false, false];
        var startRace = 1;
        var endRace = this.raceNo;
        if (expandedRace != undefined && expandedRace != null && expandedRace != 0) {
            startRace = expandedRace;
            endRace = expandedRace;
        }
        for (var i = startRace; i <= endRace; i++) {
            for (var j = 0; j < MAX_NO_OF_CWA_COMP; j++) {
                if (this.compExist[j] && !this.compSelected[j]) this.compSelected[j] = this.cwinChild[i].checkCompSelected(j);
            }
        }
    }
    this.updateCompSelectedDisplay = function() {
        for (var j = 0; j < MAX_NO_OF_CWA_COMP; j++) {
            if (this.compExist[j] && this.compSelected[j]) {
                document.getElementById('cwinHeader' + (j + 1)).style.backgroundColor = '#CEE3F6';
            } else {
                document.getElementById('cwinHeader' + (j + 1)).style.backgroundColor = '';
            }
        }
    }
}

function handleEmptyStr(str) {
    return (!str || str == '') ? '&nbsp;' : str;
}

function initCwinVariables(cwinStarters, cwinOpts, cwinGroups, cwinPools, cwinPoolName, cwinPoolTitle) {
    cwinPools.push(null);
    for (var i = 1; i < cwinDetails.length; i++) {
        if (cwinDetails[i] != "") {
            cwinPools.push(cwinDetails[i].split('|'));
        } else {
            cwinPools.push(null);
        }
    }
    for (var h = 1; h <= cwinPools.length; h++) { // cwinPools.length = no. of race
        if (cwinPools[h] != null) {
            cwinPoolName[h] = new Array();
            cwinPoolTitle[h] = new Array();
            cwinStarters[h] = new Array();
            cwinGroups[h] = new Array();
            cwinOpts[h] = new Array();
            for (var i = 0; i < cwinPools[h].length; ++i) {
                if (cwinPools[h][i] != 'undefined' && cwinPools[h][i] != '') {
                    var pool = {};
                    var poolInfo = cwinPools[h][i].split('/')[0];
                    var poolCode = poolInfo.split('$')[0];
                    var poolName = poolInfo.split('$')[1];
                    /*
                    var poolTitle;
                    if (poolCode == "CWA") {
                        poolTitle = '<%=Global.translator.GetString("CWA","RACING")%>';
                    } else if (poolCode == "CWB") {
                        poolTitle = '<%=Global.translator.GetString("CWB","RACING")%>';
                    } else if (poolCode == "CWC") {
                        poolTitle = '<%=Global.translator.GetString("CWC","RACING")%>';
                    } else {
                        poolTitle = '<%=Global.translator.GetString("' + poolCode.trim().toString() + '","LABEL")%>';
                    }

                    poolTitle = 'CWA';         */
                    /*
                    if (poolName != "") {
                        cwinPoolTitle[h][poolCode] = poolTitle + " (" + poolName + ")";
                    } else {
                        cwinPoolTitle[h][poolCode] = poolTitle;
                    }
                    */
                    cwinPoolName[h][poolCode] = poolName;
                    cwinPoolTitle[h][poolCode] = poolName;
                    var poolGroups = cwinPools[h][i].split('/');
                    poolGroups.splice(0, 1);
                    var groups = [];
                    cwinOpts[h][poolCode] = new Array();
                    for (var j = 0; j < poolGroups.length; ++j) {
                        var groupInfo = poolGroups[j].split('=')[0];
                        var groupNo = groupInfo.split('$')[0];
                        var groupName = groupInfo.split('$')[1];
                        var compositeStarters = poolGroups[j].split('=')[1].split('+');
                        if (poolGroups[j].split('=')[1] != "") {
                            if (groupNo != "OutsiderList") {
                                cwinStarters[h][groupNo] = poolGroups[j].split('=')[1];
                                cwinGroups[h][groupNo] = groupName;
                                cwinOpts[h][poolCode][groupNo.slice(1)] = groupNo;
                            }
                        }
                    }
                }
            }
        }
    }
}

function initCwinTablePool(tb) {
    var pools = cwinOpts[tb.raceNo][tb.cwinName];
    var tempStarters = [];
    tb.cwinOpt = [];
    for (var i = 1; i <= pools.length - 1; i++) {
        tempStarters[pools[i]] = cwinStarters[tb.raceNo][pools[i]].split('+');
        tb.cwinOpt.push(pools[i]);
        if (cwinGroups[tb.raceNo][pools[i]] != "") {
            tb.cwinHasGroupName = true;
        }
    }
    tb.cwinStarters = tempStarters;
    tb.cwinGroups = cwinGroups[tb.raceNo];
    tb.cwinPoolName = cwinPoolName[tb.raceNo];
    tb.cwinPoolTitle = cwinPoolTitle[tb.raceNo];
}