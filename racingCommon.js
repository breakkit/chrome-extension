var isIE = navigator.appName.indexOf('Microsoft') > -1;

function unloadCommon() {
    sellStatDoc = null;
    winOddsDoc = null;
    combOddsDoc = null;
    dblDoc = null;
    progDoc = null;
    scratchDoc = null;
    poolTotDoc = null;

    unloadRacingComponent();

    document.onkeydown = null;
    document.oncontextmenu = null;
    document.oncopy = null;
    document.onbeforecopy = null;
}

//////////////////////////////////////////////////////////////////////////
//  Get XML function to fully support IE / FireFox
//////////////////////////////////////////////////////////////////////////
//function createXmlObject() {
//  if ( document.implementation && document.implementation.createDocument )
//    return document.implementation.createDocument('', '', null);
//  else
//    return new ActiveXObject('Microsoft.XMLDOM');
//}

//function getNodes(pNode, expr) {
//  if ( !isIE ) {
//    var n = pNode;
//    var tmpArr = expr.split('/');
//    for ( var i=0; i<tmpArr.length; i++ ) {
//      n = n.getElementsByTagName(tmpArr[i])
//      if ( i==tmpArr.length-1 )
//        return n;
//      if ( n==null )
//        return null;
//      n = n[0];
//    }
//  }
//  else
//    return pNode.selectNodes(expr);
//}

//function getSingleNode(pNode, expr) {
//  if ( !isIE ) {
//    var n = pNode;

//    var tmpArr = expr.split('/');

//    for ( var i=0; i<tmpArr.length; i++ ) {
//      n = n.getElementsByTagName(tmpArr[i]);
//      if ( n==null || n.length==0 )
//        return null;
//      n = n[0];
//    }
//    return n;
//  }
//  else
//    return pNode.selectSingleNode(expr);
//}

//function getSingleNodeWithCondition(pNode, expr, attrName, attrValue) {
//  if ( !isIE ) {
//    var nodes = getNodes(pNode, expr);
//    for ( var i=0; i<nodes.length; i++ ) {
//      var val = getAttribute(nodes[i], attrName);
//      if ( val==attrValue )
//        return nodes[i];
//    }
//    return null;
//  }
//  else
//    return pNode.selectSingleNode(expr + '[@' + attrName + '= "' + attrValue + '"]');
//}

//function getSingleNodeWithConditionTag(pNode, expr, tagName, tagValue) {
//  if ( !isIE ) {
//    var nodes = getNodes(pNode, expr);
//    for ( var i=0; i<nodes.length; i++ ) {
//      var val = getText(getSingleNode(nodes[i], tagName));
//      if ( val==tagValue )
//        return nodes[i];
//    }
//    return null;
//  }
//  else
//    return pNode.selectSingleNode(expr + '[' + tagName + '= "' + tagValue + '"]');
//}

//function getAttribute(pNode, attrName) {
//  if ( !isIE ) {
//    if ( pNode.attributes.getNamedItem(attrName) )
//      return pNode.attributes.getNamedItem(attrName).value;
//  }
//  else {
//    if ( pNode.selectSingleNode('@'+attrName) )
//      return pNode.selectSingleNode('@'+attrName).text;
//  }
//  return '';
//}

//function getText(pNode) {
//  if ( !isIE ) {
//    if ( pNode.childNodes.length > 0 )
//      return pNode.childNodes[0].nodeValue;
//    return '';
//  }
//  else
//    return pNode.text;
//}

//////////////////////////////////////////////////////////////////////////
//  refresh odds update time
//////////////////////////////////////////////////////////////////////////
function updateRefreshTime(inTime) {
    var aTime = inTime.replace(/:/g, '');
    if (aTime != '' && !isNaN(aTime)) {
        aTime = aTime.substring(0, 2) + ':' + aTime.substring(2, 4);

        var oTime = '';
        if (document.getElementById('oddsRefreshTime'))
            oTime = document.getElementById('oddsRefreshTime').innerHTML;

        if (oTime != '' && oTime != null)
            if(oTime > aTime && !(oTime.substring(0, 2) == '23' && aTime.substring(0, 2) == '00'))
                aTime = oTime;            
        
        if (document.getElementById('oddsRefreshTime'))
            document.getElementById('oddsRefreshTime').innerHTML = aTime;
        if (document.getElementById('PwinTime'))
            document.getElementById('PwinTime').innerHTML = aTime;
    }
}

//////////////////////////////////////////////////////////////////////////
//  Auto refresh start/stop sell status
//////////////////////////////////////////////////////////////////////////
//var sellStatDoc = createXmlObject();

//function sellStatLoadDoc(url, mDate, mVenue) {
////  sellStatDoc.load(url + '?type=jcbwsell_status&date=' + mDate + '&venue=' + mVenue);
////  sellStatRefreshDoc(0);
//}
/* jcbwsell_status won't be used any more
function sellStatLoadDoc(url, mDate, mVenue) {
sellStatRefreshDoc(url + '?type=jcbwsell_status&date=' + mDate + '&venue=' + mVenue, 0);
}
function sellStatRefreshDoc(url, retry) {
if (retry > 2)
return;
JXml.GetData({
Url: url,
Type: "GET",
Cache: false,
Async: true,
DataType: "xml",
OnSuccess: function(xml) {
var str = JXml.GetText(JXml.SelectSingleNode(xml, 'SINFO'));

if (str != '') {
poolSellStatus = str.split('@@@');
refreshSellStatus(poolSellStatus);
}
},
error: function() { window.setTimeout('sellStatRefreshDoc(' + url + ',' + (retry + 1) + ')', 400); }
});
}
//function sellStatRefreshDoc(retry) {
//  if ( retry > 2 )
//    return;

//  if ( sellStatDoc.readyState == '4' ) {
//    var str = getText(getSingleNode(sellStatDoc,'SINFO'));
//    if ( str!='' ) {
//      poolSellStatus = str.split('@@@');
//      refreshSellStatus(poolSellStatus);
//    }
//  }
//  else
//    window.setTimeout('sellStatRefreshDoc(' + (retry+1) + ')', 400);
//}

function refreshSellStatus(sellStat) {
for ( var i=1; i<wpTableList.length; i++ ) {
if ( wpTableList[i]!=null ) {
wpTableList[i].startSell = (sellStat[0]=='1') ? 1 : 0;
wpTableList[i].sellStatus = wpTableList[i].singleRace ? sellStat[wpTableList[i].firstLeg] : sellStat[i];
wpTableList[i].setInnerTableHtml();
}
}

try { updateSellStatus(); } catch ( ex ) {}
}
*/
//////////////////////////////////////////////////////////////////////////
//  Get all WIN odds
//////////////////////////////////////////////////////////////////////////
//var winOddsDoc = createXmlObject();

//function winOddsLoadDoc(url, mDate, mVenue, data) {
//  var dataParam = '';
//  if ( data!=null && data!='' )
//    dataParam = '&data=' + data;
//  winOddsDoc.load(url + '?type=jcbwracing_winodds&date=' + mDate + '&venue=' + mVenue + dataParam);
//  winOddsRefreshDoc(0);
//}

//function winOddsRefreshDoc(retry) {
//  if ( retry > 2 )
//    return;

//  if ( winOddsDoc.readyState == '4' ) {
//    var str = getText(getSingleNode(winOddsDoc,'OUT'));
//    if ( str!='' ) {
//      winOddsByRace = str.split('@@@');
//      refreshWinOdds(winOddsByRace);
//      updateRefreshTime(winOddsByRace[0]);
//      
//      try {
//        syncTableRowHeight();
//      } catch (e) {}
//    }
//  }
//  else
//    window.setTimeout('winOddsRefreshDoc(' + (retry+1) + ')', 400);
//}

//function refreshWinOdds(winOdds) {
//  for ( var i=1; i<wpTableList.length; i++ ) {
//    if ( wpTableList[i]!=null ) {
//      if ( wpTableList[i].singleRace ) {
//        wpTableList[i].winOdds = wpTableList[wpTableList[i].firstLeg].winOdds;
//      }
//      else {
//        var tmpOdds = winOdds[i].split(';');
//        if ( tmpOdds.length<=1 )
//          wpTableList[i].clearWinOdds();
//        for ( var j=1; j<tmpOdds.length; j++ ) {
//          var tmpStr = tmpOdds[j].split('=');
//          wpTableList[i].winOdds[parseInt(tmpStr[0], 10)] = tmpStr[1];
//        }
//      }
//      wpTableList[i].setInnerTableHtml();
//    }
//  }
//}
function winOddsLoadDoc(url, mDate, mVenue, data, start, end) {
    var dataParam = '';
    if (data != null && data != '')
        dataParam = '&data=' + data;
    if (start != null && start != '')
        dataParam += '&start=' + start;
    if (end != null && end != '')
        dataParam += '&end=' + end;
    winOddsRefreshDoc(url + '?type=jcbwracing_winodds&date=' + mDate + '&venue=' + mVenue + dataParam, 0);
}

function winOddsRefreshDoc(url, retry) {
    if (retry > 2)
        return;
    JXml.GetData({
        Url: url,
        Type: "GET",
        Cache: false,
        DataType: "xml",
        OnSuccess: function(xml) {
            var str = JXml.GetText(JXml.SelectSingleNode(xml, 'OUT'));
            if (str != '') {
                winOddsByRace = str.split('@@@');
                refreshWinOdds(winOddsByRace);
                updateRefreshTime(winOddsByRace[0]);
            }
        },
        error: function() { window.setTimeout('winOddsRefreshDoc(\'' + url + '\',' + (retry + 1) + ')', 400); }
    });
}

//odds push
function winOddsRefreshDocPush(str) {
    if (str && str != '') {
        winOddsByRace = str.split('@@@');
        refreshWinOdds(winOddsByRace);
        updateRefreshTime(winOddsByRace[0]);
    }
}

//odds push
function winOddsRefreshDocPushSingle(winOddsByRace, raceNo) {
    //var winOddsByRace = str.split('@@@');
    if (winOddsByRace.length > 0) {
        var tmp = winOddsByRace[raceNo].split('#');
        updateRefreshTime(winOddsByRace[0]);

        var tmpOdds = tmp[0].split(';');
        for (var j = 1; j < tmpOdds.length; j++) {
            var tmpStr = tmpOdds[j].split('=');
            wpTableList[raceNo].winOdds[parseInt(tmpStr[0], 10)] = tmpStr[1];
            wpTableList[raceNo].winColorInd[parseInt(tmpStr[0], 10)] = tmpStr[2];
        }

        tmpOdds = tmp[1].split(';');
        for (var j = 1; j < tmpOdds.length; j++) {
            var tmpStr = tmpOdds[j].split('=');
            wpTableList[raceNo].plaOdds[parseInt(tmpStr[0], 10)] = tmpStr[1];
            wpTableList[raceNo].plaColorInd[parseInt(tmpStr[0], 10)] = tmpStr[2];
        }
    }
}

function refreshWinOdds(winOdds) {
    var lastFoundOdds = -1;
    for (var i = 1; i < wpTableList.length; i++) {
        if (wpTableList[i] != null) {
            if (typeof winOdds[i] != "undefined" || (lastFoundOdds != -1 && wpTableList[i].selectPool == "TCE") ) {
                if (wpTableList[i].singleRace && wpTableList[i].firstLeg != i) {
                    wpTableList[i].winOdds = wpTableList[wpTableList[i].firstLeg].winOdds;
                }
                else {
                    var winOddsIdx = (lastFoundOdds != -1 && wpTableList[i].selectPool == "tce") ? lastFoundOdds : i;
                    var tmpOdds = winOdds[winOddsIdx].split(';');
                    if (tmpOdds.length <= 1)
                        wpTableList[i].clearWinOdds();
                    for (var j = 1; j < tmpOdds.length; j++) {
                        var tmpStr = tmpOdds[j].split('=');
                        wpTableList[i].winOdds[parseInt(tmpStr[0], 10)] = tmpStr[1];
                    }
                }
                wpTableList[i].setInnerTableHtml();
                lastFoundOdds = i;
            }
            else {
                wpTableList[i].clearWinOdds();
                wpTableList[i].setInnerTableHtml();                
            }
        }
    }

    if (isEditBetMode && typeof openEditOddsContent == 'function') {
        openEditOddsContent();
    }
}
//////////////////////////////////////////////////////////////////////////
//  Get single WIN/PLA odds
//////////////////////////////////////////////////////////////////////////
//function wpOddsLoadDoc(url, mDate, mVenue, start, end, data) {
//  var dataParam = '';
//  if ( data!=null && data!='' )
//    dataParam = '&data=' + data;
//  winOddsDoc.load(url + '?type=jcbwracing_winplaodds&date=' + mDate + '&venue=' + mVenue + '&start=' + start + '&end=' + end + dataParam);
//  wpOddsRefreshDoc(0);
//}

//function wpOddsRefreshDoc(retry) {
//  if ( retry > 2 )
//    return;

//  if ( winOddsDoc.readyState == '4' )
//    wpRefreshOdds();
//  else
//    window.setTimeout('wpOddsRefreshDoc(' + (retry+1) + ')', 400);
//}

//function wpRefreshOdds() {
//  var str = getText(getSingleNode(winOddsDoc,'OUT'));
//  if ( str!='' ) {
//    winOddsByRace = str.split('@@@');
//    parseWPOdds(winOddsByRace);
//    updateRefreshTime(winOddsByRace[0]);
//  }
//}
function wpOddsLoadDoc(url, mDate, mVenue, start, end, data) {
    var dataParam = '';
    if (data != null && data != '')
        dataParam = '&data=' + data;
    wpOddsRefreshDoc(url + '?type=jcbwracing_winplaodds&date=' + mDate + '&venue=' + mVenue + '&start=' + start + '&end=' + end + dataParam, 0);
}

function wpOddsRefreshDoc(url, retry) {
    if (retry > 2)
        return;
    JXml.GetData({
        Url: url,
        Type: "GET",
        Cache: false,
        DataType: "xml",
        OnSuccess: function(xml) {
            wpRefreshOdds(xml);
        },
        error: function() { window.setTimeout('wpOddsRefreshDoc(\'' + url + '\',' + (retry + 1) + ')', 400); }
    });
}

function wpRefreshOdds(xml) {
    var str = JXml.GetText(JXml.SelectSingleNode(xml, 'OUT'));
    if (str != '') {
        winOddsByRace = str.split('@@@');
        parseWPOdds(winOddsByRace);
        updateRefreshTime(winOddsByRace[0]);
    }
}

//odds push
function wpRefreshOddsPush(str) {
    if (str != '') {
        winOddsByRace = str.split('@@@');
        parseWPOdds(winOddsByRace);
        updateRefreshTime(winOddsByRace[0]);
    }
}

function parseWPOdds(wpOdds) {
    updateRefreshTime(wpOdds[0]);
    for (var i = 1; i < wpTableList.length; i++) {
        if (wpTableList[i] != null && wpTableList[i] != undefined) {
            if (typeof wpOdds[i] != 'undefined' && wpOdds[i] != "") {
	            var tmp = wpOdds[i].split('#');
	            var tmpOdds = tmp[0].split(';');
	            if (tmpOdds.length <= 1)
	                wpTableList[i].clearWinOdds();
	            for (var j = 1; j < tmpOdds.length; j++) {
	                var tmpStr = tmpOdds[j].split('=');
	                wpTableList[i].winOdds[parseInt(tmpStr[0], 10)] = tmpStr[1];
	                wpTableList[i].winColorInd[parseInt(tmpStr[0], 10)] = tmpStr[2];
	            }
	
	            tmpOdds = tmp[1].split(';');
	            if (tmpOdds.length <= 1)
	                wpTableList[i].clearPlaOdds();
	            for (var j = 1; j < tmpOdds.length; j++) {
	                var tmpStr = tmpOdds[j].split('=');
	                wpTableList[i].plaOdds[parseInt(tmpStr[0], 10)] = tmpStr[1];
	                wpTableList[i].plaColorInd[parseInt(tmpStr[0], 10)] = tmpStr[2];
	            }
            }
            else {
                wpTableList[i].clearWinOdds();
                wpTableList[i].clearPlaOdds();
            }
            wpTableList[i].setInnerTableHtml();
        }
    }

    if (isEditBetMode && typeof openEditOddsContent == 'function') {
        openEditOddsContent();
    }
}

//////////////////////////////////////////////////////////////////////////
//  Get Combination Odds (QIN / QPL / TRI / F-F)
//////////////////////////////////////////////////////////////////////////
//var combOddsDoc = new Array();
//combOddsDoc['QIN'] = createXmlObject();
//combOddsDoc['QPL'] = createXmlObject();
//combOddsDoc['TRI'] = createXmlObject();
//combOddsDoc['F-F'] = createXmlObject();

//function combOddsLoadDoc(url, mDate, mVenue, raceNo, pool) {
//  combOddsDoc[pool].load(url + '?type=' + combType[combTable[pool].curFunc] + '&date=' + mDate + '&venue=' + mVenue
//                 + '&raceno=' + raceNo + combTable[pool].urlPara);
//  combOddsRefreshDoc(0, pool);
//}

//function combOddsRefreshDoc(retry, pool) {
//  if ( retry > 2 )
//    return;

//  if ( combOddsDoc[pool].readyState == '4' )
//    combOddsRefresh(pool);
//  else
//    window.setTimeout('combOddsRefreshDoc(' + (retry+1) + ', \'' + pool + '\')', 400);
//}

//function combOddsRefresh(pool) {
//  var str = getText(getSingleNode(combOddsDoc[pool],'OUT'));
//  if ( str!='' ) {
//    var tmpOdds = str.split('@@@');
//    if ( combTable[pool].curFunc==0 )
//      top20Refresh(pool, tmpOdds);
//    else if ( combTable[pool].curFunc==1 )
//      bankerTop10Refresh(pool, tmpOdds);
//    else if ( combTable[pool].curFunc==2 || combTable[pool].curFunc==3 )
//      allCombOddsRefresh(pool, tmpOdds);
//    combTable[pool].setTableToDiv();
//  }
//}
function combOddsLoadDoc(url, mDate, mVenue, raceNo, pool) {
    url += '?type=' + combType[combTable[pool].curFunc] + '&date=' + mDate + '&venue=' + mVenue
            + '&raceno=' + raceNo + combTable[pool].urlPara;
    combOddsRefreshDoc(pool, url);

}
function combOddsRefreshDoc(pool, url) {
    switch (pool) {
        case "QIN":
            combOddsRefreshDocQIN(0, url);
            break;
        case "QPL":
            combOddsRefreshDocQPL(0, url);
            break;
        case "TRI":
            combOddsRefreshDocTRI(0, url);
            break;
        case "F-F":
            combOddsRefreshDocFF(0, url);
            break;
        case "TCE":
            combOddsRefreshDocTCE(0, url);
            break;
        default:
            break;
    }
}
/*using jquery to fetch data*/
function combOddsRefreshDocTCE(retry, url) {
    if (retry > 2)
        return;
    JXml.GetData({
        Url: url,
        Type: "GET",
        OnSuccess: function(xml) {
            combOddsRefresh(xml, "TCE");
        },
        error: function() {
            window.setTimeout('combOddsRefreshDocTCE(' + (retry + 1) + ', \'' + url + '\')', 400);
        }
    });
}

function combOddsRefreshDocQIN(retry, url) {
    if (retry > 2)
        return;
    JXml.GetData({
        Url: url,
        Type: "GET",
        OnSuccess: function(xml) {
            combOddsRefresh(xml, "QIN");
        },
        error: function() {
            window.setTimeout('combOddsRefreshDocQIN(' + (retry + 1) + ', \'' + url + '\')', 400);
        }
    });
}
function combOddsRefreshDocQPL(retry, url) {
    if (retry > 2)
        return;
    JXml.GetData({
        Url: url,
        Type: "GET",
        OnSuccess: function(xml) {
            combOddsRefresh(xml, "QPL");
        },
        error: function() {
            window.setTimeout('combOddsRefreshDocQPL(' + (retry + 1) + ', \'' + url + '\')', 400);
        }
    });
}
function combOddsRefreshDocTRI(retry, url) {
    if (retry > 2)
        return;
    JXml.GetData({
        Url: url,
        Type: "GET",
        OnSuccess: function(xml) {
            combOddsRefresh(xml, "TRI");
        },
        error: function() {
            window.setTimeout('combOddsRefreshDocTRI(' + (retry + 1) + ', \'' + url + '\')', 400);
        }
    });
}
function combOddsRefreshDocFF(retry, url) {
    if (retry > 2)
        return;
    JXml.GetData({
        Url: url,
        Type: "GET",
        OnSuccess: function(xml) {
            combOddsRefresh(xml, "F-F");
        },
        error: function() {
            window.setTimeout('combOddsRefreshDocFF(' + (retry + 1) + ', \'' + url + '\')', 400);
        }
    });
}

function combOddsRefresh(xml, pool) {
    var str = JXml.GetText(JXml.SelectSingleNode(xml, 'OUT'));
    if (str != '') {
        var tmpOdds = str.split('@@@');
        if (combTable[pool].curFunc == 0)
            top20Refresh(pool, tmpOdds);
        else if (combTable[pool].curFunc == 1)
            bankerTop10Refresh(pool, tmpOdds);
        else if (combTable[pool].curFunc == 2 || combTable[pool].curFunc == 3)
            allCombOddsRefresh(pool, tmpOdds);
        else if (combTable[pool].curFunc == 4)
            investmentRefresh(pool, tmpOdds);
		setRacingTableObj1(combTable[pool]);
        combTable[pool].setTableToDiv();
        alert(tmpOdds);
    }
}

//odds push
function combOddsRefreshPush(str, pool) {
    if (str != '') {
        var tmpOdds = str.split('@@@');
        if (tmpOdds.length == 2 && tmpOdds[1] != 'undefined' && tmpOdds[1] != ';' && tmpOdds[1] != 'QIN;' && tmpOdds[1] != 'QPL;' && tmpOdds[1] != 'TRI;') {
            if (combTable[pool].curFunc == 0)
                top20Refresh(pool, tmpOdds);
            else if (combTable[pool].curFunc == 1)
                bankerTop10Refresh(pool, tmpOdds);
            else if (combTable[pool].curFunc == 2 || combTable[pool].curFunc == 3)
                allCombOddsRefresh(pool, tmpOdds);
            else if (combTable[pool].curFunc == 4)
                investmentRefresh(pool, tmpOdds);
			setRacingTableObj1(combTable[pool]);
            combTable[pool].setTableToDiv();
        }
        else {
            try {
                combTable[pool].clearTable();
                setRacingTableObj1(combTable[pool]);
                combTable[pool].setTableToDiv();
                //combOddsLoadDocImp();
            }
            catch (e) { }
        }
    }
}

function investmentRefresh(pool, tmpOdds) {
    try {
        updateRefreshTime(tmpOdds[0]);
        if (tmpOdds[1] != null) {            
            var nodes = tmpOdds[1].split(';');
            if (nodes.length <= 1)
                combTable[pool].clearTable();
            else if (nodes.length == 2 && nodes[1] == '')
                combTable[pool].clearTable();
            
            for (var j = 0; j < nodes.length; j++) {
                if (nodes[j] == null)
                    continue;

                var posNodes = nodes[j].split('|');
                if (posNodes.length == 4) {
                    var hrsNum = parseInt(posNodes[0]);

                    combTable[pool].oddsTable[hrsNum-1][0] = hrsNum;
                    for (var i = 1; i < posNodes.length; i++) {
                        var tmpStr = posNodes[i].split('=');
                        var pos = tmpStr[0];

                        combTable[pool].oddsTable[hrsNum-1][pos] = tmpStr[1];
                    }
                }
            }
        }
    } catch (e) {
        //alert(e); 
    }
}

function top20Refresh(pool, tmpOdds) {
    updateRefreshTime(tmpOdds[0]);
    if (tmpOdds[1] != null) {
        var nodeCnt = 1;
        if (tmpOdds[1].indexOf('|') > -1) {
            tmpOdds[1] = tmpOdds[1].replace(/\|/g, ';');
        }
        var nodes = tmpOdds[1].split(';');
        if (nodes.length <= 1)
            combTable[pool].clearTable();
        else if (nodes.length == 2 && nodes[1] == '')
            combTable[pool].clearTable();
        for (var j = 0; j < 4; j++) {
            for (var i = 0; i < combTable[pool].rowSize; i++) {
                if (nodeCnt < nodes.length) {
                    var tmpStr = nodes[nodeCnt].split('=');
                    combTable[pool].selTable[i][j] = tmpStr[0];
                    combTable[pool].oddsTable[i][j] = tmpStr[1];
                    nodeCnt++;
                }
            }
        }
    }
}

function bankerTop10Refresh(pool, tmpOdds) {
    updateRefreshTime(tmpOdds[0]);
    if (tmpOdds[1] != null) {
        var startIdx = (combTable[pool].curPage - 1) * 4 + 1;
        var nodes = tmpOdds[1].split(';');
        if (nodes.length <= 1)
            combTable[pool].clearTable();
        else if (nodes.length == 2 && nodes[1] == '')
            combTable[pool].clearTable();
        for (var j = startIdx; j < startIdx + 4; j++) {
            if (nodes[j] == null)
                continue;

            var bankerNodes = nodes[j].split('|');
            var nodeCnt = 1;
            for (var i = 0; i < combTable[pool].rowSize; i++) {
                if (nodeCnt < bankerNodes.length) {
                    var tmpStr = bankerNodes[nodeCnt].split('=');
                    combTable[pool].selTable[i][j - startIdx] = tmpStr[0];
                    combTable[pool].oddsTable[i][j - startIdx] = tmpStr[1];
                    nodeCnt++;
                }
            }
        }
    }
}

function allCombOddsRefresh(pool, tmpOdds) {
    updateRefreshTime(tmpOdds[0]);
    if (combTable[pool].tableType == 'Q')
        allCombOddsRefreshQ(pool, tmpOdds);
    else
        allCombOddsRefreshT(pool, tmpOdds);
}

function allCombOddsRefreshQ(pool, tmpOdds) {
    combTable[pool].haveOdds = false;
    if (tmpOdds[1] != null) {
        var nodeCnt = 1;
        var nodes = tmpOdds[1].split(';');
        if (nodes.length <= 1)
            combTable[pool].clearTable();
        else if (nodes.length == 2 && nodes[1] == '')
            combTable[pool].clearTable();
        for (var i = 1; i < nodes.length; i++) {
            if (nodes[i] && nodes[i].indexOf('=') > -1) {
                var tmpStr = nodes[i].split('=');
                var tmpSels = tmpStr[0].split('-');
                var x = parseInt(tmpSels[0], 10);
                var y = parseInt(tmpSels[1], 10);
                combTable[pool].qOdds[x][y] = tmpStr[1];
                combTable[pool].qColorInd[x][y] = 1;
                combTable[pool].haveOdds = true;
            }
        }
    }
}

function allCombOddsRefreshT(pool, tmpOdds) {
    if (tmpOdds[1] != null) {
        var nodeCnt = 1;
        var nodes = tmpOdds[1].split(';');
        if (nodes.length <= 1)
            combTable[pool].clearTable();
        else if (nodes.length == 2 && nodes[1] == '')
            combTable[pool].clearTable();
        for (var j = 0; j < 4; j++) {
            for (var i = 0; i < combTable[pool].rowSize; i++) {
                if (nodeCnt < nodes.length) {
                    var tmpStr = nodes[nodeCnt].split('=');
                    combTable[pool].selTable[i][j] = tmpStr[0];
                    combTable[pool].oddsTable[i][j] = tmpStr[1];
                    nodeCnt++;
                }
            }
        }
    }
}

//////////////////////////////////////////////////////////////////////////
//  Get DBL Odds
//////////////////////////////////////////////////////////////////////////
//var dblDoc = createXmlObject();

function dblLoadDoc(serverUrl, mDate, mVenue, raceNo, data) {
    var dataParam = '&tag=DBL/RACE';
    if (data != null && data != '')
        dataParam = '&tag=DBL_PRE/RACE&data=' + data;
    //  dblDoc.load(serverUrl + '?type=jcbwracing_full&pool=dbl&date=' + mDate + '&venue=' + mVenue
    //                 + '&raceno=' + raceNo + dataParam);
    dblRefreshDoc(0, serverUrl + '?type=jcbwracing_full&pool=dbl&date=' + mDate + '&venue=' + mVenue
                 + '&raceno=' + raceNo + dataParam);
}

function dblRefreshDoc(retry, url) {
    if (retry > 5)
        return;
    /*
    if ( dblDoc.readyState == '4' ) {
    dblRefresh();
    }
    else
    window.setTimeout('dblRefreshDoc(' + (retry+1) + ')', 400);
    */
    JXml.GetData({
        Url: url,
        Type: "GET",
        OnSuccess: function(xml) {
            dblRefresh(xml);
        },
        error: function() {
            window.setTimeout('dblRefreshDoc(' + (retry + 1) + ',\'' + url + '\')', 400);
        }
    });
}

function dblRefresh(xml) {
    dblOddsByRace = JXml.GetText(JXml.SelectSingleNode(xml, 'OUT')).split('@@@');
    dblRefreshOdds(dblOddsByRace);
}

//odds push
function dblRefreshPush(dblArray) {
    if (dblArray.length == 2 && dblArray[1] != ';') {
        dblRefreshOdds(dblOddsByRace);
    }
    else {
        dblOddsTable.clearTable();
        dblOddsTable.setTableToDiv();
    }
}

function dblRefreshOdds(tmpArrs) {
    dblOddsTable.haveOdds = false;
    if (tmpArrs.length < 1) {
        dblOddsTable.clearTable();
    }
    else {
        updateRefreshTime(tmpArrs[0]);
        var tmpOdds = tmpArrs[1].split(';');
        for (var j = 1; j < tmpOdds.length; j++) {
            if (tmpOdds[j].indexOf('=') > -1) {// handle odds push error
                var tmpStr = tmpOdds[j].split('=');
                var tmpSels = tmpStr[0].split('-');
                var x = parseInt(tmpSels[0], 10);
                var y = parseInt(tmpSels[1], 10);
                dblOddsTable.dblOdds[x][y] = tmpStr[1];
                dblOddsTable.dblColorInd[x][y] = tmpStr[2];
                dblOddsTable.haveOdds = true;
            }
        }
    }
    dblOddsTable.setTableToDiv();
}

//////////////////////////////////////////////////////////////////////////
//  Get Progressive Win Odds
//////////////////////////////////////////////////////////////////////////
//var progDoc = createXmlObject();

//function progLoadDoc(serverUrl, date, venue, raceNo) {
//  var curTime = document.getElementById("oddsRefreshTime").innerHTML;
//  if ( curTime != '' ) {
//    progDoc.load(serverUrl + '?type=jcbwracing_progwinodds&date=' + date + '&venue=' + venue + '&raceno=' + raceNo + '&cur=' + curTime.replace(':', ''));
//    progRefreshDoc(0);
//  }
//}

//function progRefreshDoc(retry) {
//  if ( retry > 2 )
//    return;

//  if ( progDoc.readyState == '4' )
//    progRefreshOdds();
//  else
//    window.setTimeout('progRefreshDoc(' + (retry+1) + ')', 400);
//}

//function progRefreshOdds() {
//  var nodes = getNodes(progDoc, 'WPROG/OUT');

//  for ( var i=0; i<nodes.length; i++ ) {
//    var oddsTime = getAttribute(nodes[i], 'TIME');
//    document.getElementById('PwinTime' + (1-i)).innerHTML = oddsTime.substring(0,2) + ':' + oddsTime.substring(2,4);
//    wpProgTable.pwinOdds[1-i] = getText(nodes[i]).split(',');
//  }
//  wpProgTable.setInnerTableHtml();
//}
function progLoadDoc(serverUrl, date, venue, raceNo) {
    var curTime = document.getElementById("oddsRefreshTime").innerHTML;
    if (curTime != '') {
        //alert(isPull + "\n" + isConnectedAMS);
        if (isPull || !isConnectedAMS) {
            progRefreshDoc(serverUrl + '?type=jcbwracing_progwinodds&date=' + date + '&venue=' + venue + '&raceno=' + raceNo + '&cur=' + curTime.replace(':', ''), 0);
        }
    }
}

function progRefreshDoc(url, retry) {
    if (retry > 2)
        return;
    JXml.GetData({
        Url: url,
        Type: "GET",
        OnSuccess: function(xml) {
            progRefreshOdds(xml);
        },
        error: function() { window.setTimeout('progRefreshDoc(\'' + url + '\',' + (retry + 1) + ')', 400); }
    });
}

function progRefreshOdds(xml) {
    var nodes = JXml.SelectNodes(xml, 'WPROG/OUT');
    for (var i = 0; i < nodes.length; i++) {
        var oddsTime = JXml.GetAttribute(nodes[i], 'TIME');
        document.getElementById('PwinTime' + (1 - i)).innerHTML = oddsTime.substring(0, 2) + ':' + oddsTime.substring(2, 4);
        wpProgTable.pwinOdds[1 - i] = JXml.GetText(nodes[i]).split(',');
    }
    wpProgTable.setInnerTableHtml();
}

// odds push
function progRefreshOddsPush(data) {
    if (data != "" && data) {
        for (var i = 0; i < data.split(';').length; i++) {
            var dataStr = data.split(';')[i];
            var oddsTime = dataStr.split(',')[0];
            document.getElementById('PwinTime' + (1 - i)).innerHTML = oddsTime.substring(0, 2) + ':' + oddsTime.substring(2, 4);
            wpProgTable.pwinOdds[1 - i] = dataStr.substr(dataStr.indexOf(',') + 1).split(',');
        }

        if (data.split(';').length == 1) {
            document.getElementById('PwinTime0').innerHTML = "";
            wpProgTable.pwinOdds[0] = clearArrayData(wpProgTable.pwinOdds[0]);
        }
        
        wpProgTable.setInnerTableHtml();
    }
    else {
        wpProgTable.pwinOdds[0] = clearArrayData(wpProgTable.pwinOdds[0]);
        wpProgTable.pwinOdds[1] = clearArrayData(wpProgTable.pwinOdds[1]);
        wpProgTable.plaOdds = clearArrayData(wpProgTable.plaOdds);
        wpProgTable.winOdds = clearArrayData(wpProgTable.winOdds);
        wpProgTable.setInnerTableHtml();
        document.getElementById('PwinTime0').innerHTML = "";
        document.getElementById('PwinTime1').innerHTML = "";
    }
}

function clearArrayData(arrayObj) {
    var emptyArray = new Array();
    for (var i = 0; i < arrayObj.length; i++) {
        emptyArray.push("");
    }
    return emptyArray;
}

//////////////////////////////////////////////////////////////////////////
//  Get Scratch Horse
//////////////////////////////////////////////////////////////////////////
//var scratchDoc = createXmlObject();

//function scratchLoadDoc(url, mDate, mVenue) {
//  scratchDoc.load(url + '?type=jcbwracing_scratched&date=' + mDate + '&venue=' + mVenue);
//  scratchRefreshDoc(0);
//}

//function scratchRefreshDoc(retry) {
//  if ( retry > 2 )
//    return;

//  if ( scratchDoc.readyState == '4' ) {
//    var str = getText(getSingleNode(scratchDoc,'SR'));
//    ranRace = getAttribute(getSingleNode(scratchDoc,'SR'), "RAN_RACE");
//    if ( str!='' ) {
//      scratchList = str;
//      refreshScratchHorse(scratchList);
//      sendDataToBetslip();
//    }
//  }
//  else
//    window.setTimeout('scratchRefreshDoc(' + (retry+1) + ')', 400);
//}
function scratchLoadDoc(url, mDate, mVenue) {
    scratchRefreshDoc(url + '?type=jcbwracing_scratched&date=' + mDate + '&venue=' + mVenue, 0);
}

function scratchRefreshDoc(url, retry) {
    if (retry > 2)
        return;
    JXml.GetData({
        Url: url,
        Type: "GET",
        Cache: false,
        DataType: "xml",
        OnSuccess: function(xml) {
            var str = JXml.GetText(JXml.SelectSingleNode(xml, 'SR'));
            ranRace = JXml.GetAttribute(JXml.SelectSingleNode(xml, 'SR'), "RAN_RACE");
            if (str != '') {
                scratchList = str;
                refreshScratchHorse(scratchList);
                sendDataToBetslip();
            }
        },
        error: function() { window.setTimeout('scratchRefreshDoc(\'' + url + '\',' + (retry + 1) + ')', 400); }
    });
}

function refreshScratchHorse(scratchList) {
    
    //for clear scratch value
    for (var j = startersStatusByRace.length - 1; j > 0; j--) {
        horseStats[j] = startersStatusByRace[j].split('|');
        if (wpTableList[j]) {
            for (var i = 1; i < horseStats[j].length; i++) {
                var hStatSub = horseStats[j][i].split('/');
                for (var k = 0; k < hStatSub.length; k++)
                    if (wpTableList[j].tableObj[i] && wpTableList[j].tableObj[i][k]) {
                        wpTableList[j].tableObj[i][k].hScr = 0;
                        if (pageName == 'TCE' && wpTableList[j + 1] && wpTableList[j + 2]) {
                            wpTableList[j + 1].tableObj[i][k].hScr = 0;
                            wpTableList[j + 2].tableObj[i][k].hScr = 0;
                        }
                    }
            }

            wpTableList[j].setInnerTableHtml();
            if (typeof(pageName) != 'undefined' && pageName == 'TCE' && wpTableList[j + 1] && wpTableList[j + 2]) {
                wpTableList[j + 1].setInnerTableHtml();
                wpTableList[j + 2].setInnerTableHtml();
            }            
        }
    }
	
    var scratchs = scratchList.split(';');
    var tbNos = "";
    if (scratchs.length > 1) {
        clearScratchList();
        for (var i = 1; i < scratchs.length; i++) {
            var tmp = scratchs[i].split('#');
            var raceNo = parseInt(tmp[0], 10);
            var runnerNo = parseInt(tmp[1], 10);
            if (horseScratchs[raceNo] != null)
                horseScratchs[raceNo][runnerNo] = '1';
            if (wpTableList[raceNo] != null) {
                if (typeof (pageName) != 'undefined' && pageName == 'TCE') {
                    if (raceNo == parseInt(curentRaceNo)) {
                        if (!wpTableList[raceNo].singleRace || raceNo == wpTableList[raceNo].firstLeg) {// for TCE
                            for (var n = raceNo; n <= raceNo + 2; n++) {
                                if (wpTableList[n] && wpTableList[n].tableObj[runnerNo]) {
                                    wpTableList[n].tableObj[runnerNo][0].hScr = '1';
                                    wpTableList[n].tableObj[runnerNo][0].hStat = 'S';
                                }
                            }
                        }
                    }
                }
                else {
                    wpTableList[raceNo].tableObj[runnerNo][0].hScr = '1';
                    wpTableList[raceNo].tableObj[runnerNo][0].hStat = 'S';
                }

                if (tbNos.indexOf(raceNo.toString()) < 0) {
                    tbNos = (tbNos == "" ? raceNo : tbNos + "," + raceNo.toString()).toString();
                }
            }
        }
        if (typeof (pageName) != 'undefined' && pageName == 'TCE') {
            for (var n = parseInt(curentRaceNo); n <= parseInt(curentRaceNo) + 2; n++) {
                if (typeof wpTableList[n] != 'undefined') {
                    wpTableList[n].setInnerTableHtml();
                }
            }
        }
        else {
            tableNum = tbNos.split(',');
            for (var i = 0; i < tableNum.length; i++) {
                if (typeof wpTableList[parseInt(tableNum[i])] != 'undefined') {
                    if (typeof wpTableList[parseInt(tableNum[i])] != undefined) {
                        wpTableList[parseInt(tableNum[i])].setInnerTableHtml();
                    }
                }
            }
        }
    }

    try {
        if (isEditBetMode && typeof openEditOddsContent == 'function') {
            openEditOddsContent();
        }
    } catch (e) { }

}

function clearScratchList() {
    for (var i = 0; i < horseScratchs.length; i++) {
        for (var j = 0; j < 15; j++) {
            if (horseScratchs[i] != null && horseScratchs[i] != undefined
            && horseScratchs[i][j] != null && horseScratchs[i][j] != undefined)
                horseScratchs[i][j] = '0';
        }
    }
}

function reserveLoadDoc(url, mDate, mVenue) {
    	reserveRefreshDoc(url + '?type=jcbwracing_reserve&date=' + mDate + '&venue=' + mVenue, 0);
}

function reserveRefreshDoc(url, retry) {
    if (retry > 2)
        return;
    JXml.GetData({
        Url: url,
        Type: "GET",
        Cache: false,
        DataType: "xml",
        OnSuccess: function(xml) {
            var str = JXml.GetText(JXml.SelectSingleNode(xml, 'R/SR'));
            var sStr = JXml.GetText(JXml.SelectSingleNode(xml, 'R/SS'));
            if (sStr != '') {
                reserveList = str;
                startersStatusByRace = sStr.split('@@@');
                refreshReserveHorse();
                sendDataToBetslip();
            }
        },
        error: function() { window.setTimeout('reserveLoadDoc(\'' + url + '\',' + (retry + 1) + ')', 400); }
    });
}

function refreshReserveHorse() {
    for (var j = startersStatusByRace.length - 1; j > 0; j--) {
        horseStats[j] = startersStatusByRace[j].split('|');
        if (wpTableList[j]) {
            for (var i = 1; i < horseStats[j].length; i++) {
                var hStatSub = horseStats[j][i].split('/');
                for (var k = 0; k < hStatSub.length; k++)
                    if (wpTableList[j].tableObj[i] && wpTableList[j].tableObj[i][k]) {
                    wpTableList[j].tableObj[i][k].hStat = hStatSub[k];
                    if (pageName == 'TCE' && wpTableList[j + 1] && wpTableList[j + 2]) {
                        wpTableList[j + 1].tableObj[i][k].hStat = hStatSub[k];
                        wpTableList[j + 2].tableObj[i][k].hStat = hStatSub[k];
                    }
                }
            }
            wpTableList[j].setInnerTableHtml();
            if (pageName == 'TCE' && wpTableList[j + 1] && wpTableList[j + 2]) {
                wpTableList[j + 1].setInnerTableHtml();
                wpTableList[j + 2].setInnerTableHtml();
            }
        }
    }

    if (isEditBetMode && typeof openEditOddsContent == 'function') {
        openEditOddsContent();
    }
}

function clearReserveList() {
    for (var j = 1; j < 15; j++) {
        if (wpTableList[j])
            for (var i = 1; i < wpTableList[j].tableObj.length; i++) {
            if (wpTableList[j].tableObj[i])
                wpTableList[j].tableObj[i][0].hStat = '';
        }
    }
}



//////////////////////////////////////////////////////////////////////////
//  get pool investment by poolType, date, venue and race no.
//////////////////////////////////////////////////////////////////////////
//var poolTotSDoc = createXmlObject();
//function poolTotSLoadDoc(url, date, venue, raceNo, pool) {
//  poolTotSDoc.load(url + '?type=jcbwracing_singlepooltot&date=' + date
//                     + '&venue=' + venue + '&raceno=' + raceNo + '&pool=' + pool);
//  poolTotSRefreshDoc(0);
//}

//function poolTotSRefreshDoc(retry) {
//  if ( retry > 2 )
//    return;

//  if ( poolTotSDoc.readyState == '4' ) {
//    var node = poolTotSDoc.selectSingleNode("PT");
//    document.getElementById('poolInvTxt').innerHTML = '$' + addComma(node.text);
//  }
//  else
//    window.setTimeout('poolTotSRefreshDoc(' + (retry+1)  + ')', 400);
//}

function poolTotSLoadDoc(url, date, venue, raceNo, pool) {
    poolTotSRefreshDoc(url + '?type=jcbwracing_singlepooltot&date=' + date
                     + '&venue=' + venue + '&raceno=' + raceNo + '&pool=' + pool, 0);
}

function poolTotSRefreshDoc(url, retry) {
    if (retry > 2)
        return;
    JXml.GetData({
        Url: url,
        Type: "GET",
        Cache: false,
        DataType: "xml",
        OnSuccess: function(xml) {

            var node = JXml.SelectSingleNode(xml, "PT");
            document.getElementById('poolInvTxt').innerHTML = '$' + addComma(JXml.GetText(node));
        },
        error: function() { window.setTimeout('poolTotSRefreshDoc(\'' + url + '\',' + (retry + 1) + ')', 400); }
    });
}

//for odds push
function poolTotSRefreshPush(SingleInves) {
    if (document.getElementById('poolInvTxt')) {
        if (SingleInves == "" || SingleInves == "-")
            document.getElementById('poolInvTxt').innerHTML = '$-';
        else
        document.getElementById('poolInvTxt').innerHTML = '$' + addComma(SingleInves);
}
}

//////////////////////////////////////////////////////////////////////////
//  HF / Odds drop color schema related
//////////////////////////////////////////////////////////////////////////
function getOddsBgColor(ind) {
    var col = '';
    switch (ind) {
        case '0':
            col = '';
            break;
        case '1':
            col = hfBg;
            break;
        case '2':
            col = od20Bg;
            break;
        case '3':
            col = od50Bg;
            break;
        default:
            col = '';
    }
    return col;
}

function getOddsFgColor(ind) {
    var col = '#000000';
    switch (ind) {
        case '0':
            col = '#000000';
            break;
        case '1':
            col = hfFg;
            break;
        case '2':
            col = od20Fg;
            break;
        case '3':
            col = od50Fg;
            break;
        default:
            col = '#000000';
    }
    return col;
}

//////////////////////////////////////////////////////////////////////////
//   Popup / New Window / Page Redirect Related
//////////////////////////////////////////////////////////////////////////
function NewWindow(mypage, myname, w, h, scroll, resizable, toolbar) {
    var winl = (screen.width - w) / 2;
    var wint = (screen.height - h) / 2;
    winprops = 'height=' + h + ',width=' + w + ',top=' + wint + ',left=' + winl + ',scrollbars=' + scroll + ',resizable=' + resizable + ',toolbar=' + toolbar + ','
    win = window.open(mypage, myname, winprops)
    win.self.focus()
    if (parseInt(navigator.appVersion) >= 4) { win.window.focus(); }
}

function goBettingGuide(lang) {
    popupLinkNW('http://special.hkjc.com/root2/racing/info/' + lang + '/betting/guide_qualifications_pari.asp', 'menu_newWindow');
}

function goFixedOddsBettingGuide(lang) {
    popupLinkNW('http://special.hkjc.com/root2/racing/info/' + lang + '/betting/guide_qualifications_fixed.asp', 'menu_newWindow');
}

function goHorseRecord2(jcewurl, code) {
    NewWindow(jcewurl + '/racing/horse.asp?horseno=' + code, '', '680', '440', 'yes', 'yes', 'yes');
}

function goHorseRecord3(jcewurl, lang, code) {
    var url = jcewurl.replace('[LANG]', lang).replace('[HORSE_CODE]', code);
    NewWindow(url, '', '680', '440', 'yes', 'yes', 'yes');
}

function goJockeyRecord2(jcewurl, code, isOther) {
    if (isOther)
        NewWindow(jcewurl + '/racing/jockey.asp', '', '680', '440', 'yes', 'yes', 'yes');
    else
        NewWindow(jcewurl + '/racing/jockeyprofile.asp?jockeycode=' + code, '', '680', '440', 'yes', 'yes', 'yes');
}

function goTrainerRecord2(jcewurl, code) {
    NewWindow(jcewurl + '/racing/trainerprofile.asp?trainercode=' + code, '', '680', '440', 'yes', 'yes', 'yes');
}

function getJkcRaceByRaceUpate(date, venue, totalRace, lang, race) {
    NewWindow('/racing/pages/results_jkcdtls.aspx?date=' + date + '&venue=' + venue + '&r=' + totalRace + '&lang=' + lang + '&raceno=' + race, '', '680', '345', 'yes', 'yes', 'no');
}

function changeDateVenue(url, dateVenue) {
    var tmp = url;
    if (url.indexOf('?') > 0)
        tmp += '&';
    else
        tmp += '?';
    tmp += 'date=' + dateVenue.substr(0, 10) + '&venue=' + dateVenue.substr(10, 2) + '&raceno=1';
    location.href = tmp;
}

function changeRaceNo(url, race) {
    var tmp = url + '&raceno=' + race;
    location.href = tmp;
}

//////////////////////////////////////////////////////////////////////////
//   betslip related
//////////////////////////////////////////////////////////////////////////
function changeLang(url, lang) {
    var toBeChgLang = (lang == 0) ? 1 : 0;
    try {
        if (top.betSlipFrame == undefined || top.showMode == "0") //betslip not exist
            location.href = url;
        else {
            var result = -1;

            if (top.betSlipFrame.nobetslip || top.betSlipFrame.hasPromotion) {
                if (lang == 0)
                    top.betSlipFrame.location.href = top.betSlipFrame.location.href.replace("lang=C", "lang=E");
                else
                    top.betSlipFrame.location.href = top.betSlipFrame.location.href.replace("lang=E", "lang=C");
            }
            else {
                try {
                    var wnd = window;
                    top.endChgLang = function() {	// SSO Support, RiversZhao, 01/11/2010
                        try {
                            wnd.location.href = wnd.location.protocol + "//" + wnd.location.host + url;
                            top.saveLangPreference(toBeChgLang);
                        }
                        catch (e) {
                        }
                    }
                    result = top.betSlipFrame.chgLang(toBeChgLang);
                } catch (e) { ; }
            }

            if (result != 0) {
                location.href = url;

                top.saveLangPreference(toBeChgLang); 	//Q209 Language Personalization  
            }
        }
    }
    catch (e) { ; }
}

function getBetslipSettingsBetUnit(pools) {
    try {
        if (pools == '-')
            return '';
        return top.betSlipFrame.getMinimumUnitBetAmount(pools, 'HB');
    }
    catch (e) {
        return 10;
    }
}

function sendDataToBetslip() {
    try {
        setMultiRacesPoolDefLegs(multiRacePoolsStr);
        setFieldSize(fieldSizeWithReserve);
        //   appendReserveHorseToScratchList();  //SQ45193
        //   alert(scratchList);
        setScratch(scratchList);
        setScratch(reserveList);
        top.betSlipFrame.setXmlData(multiRacePoolsStr, fieldSizeWithReserve, scratchList, reserveList);
    }
    catch (e) {
    }
}

function sendMeetingDateToBetslip(dateStr) {
    try {
        top.betSlipFrame.setMeetingDate(dateStr);
    }
    catch (e) {
    }
}

function appendReserveHorseToScratchList() {
    var buf = new StringBuffer();
    var tmpScratchList = scratchList + ';';
    for (var i = 1; i < startersStatusByRace.length; i++) {
        var statByRunner = startersStatusByRace[i].split('|');
        for (var j = 1; j < statByRunner.length; j++) {
            var statByBracket = statByRunner[j].split('/');
            var srCount = 0;
            var rCount = 0;
            for (var k = 0; k < statByBracket.length; k++) {
                if (statByBracket[k].indexOf('R') >= 0)
                    rCount++;
                if (statByBracket[k] != '')
                    srCount++;
            }
            if (srCount == statByBracket.length && rCount != statByBracket.length) {
                var tmpStr = ';' + i + '#' + j;
                if (tmpScratchList.indexOf(tmpStr + ';') < 0)
                    buf.append(tmpStr);
            }
            if (rCount == statByBracket.length) {
                var tmpStr = ';' + i + '#' + j + ';';
                tmpScratchList = tmpScratchList.replace(tmpStr, ';');
            }
        }
    }
    scratchList = tmpScratchList + buf.toString().substring(1);
}

//////////////////////////////////////////////////////////////////////////
//   formatting related
//////////////////////////////////////////////////////////////////////////
function addComma(ls_num) {
    var ls_num_decimal = '';
    var li_dploc = ls_num.indexOf(".");

    if (li_dploc > -1) {
        ls_num_decimal = ls_num.substring(li_dploc);
        ls_num = ls_num.substring(0, li_dploc);
    }

    var tmp = "";
    var ls_fmtNum = "";
    for (var i = ls_num.length; i > 0; i -= 3)
        tmp = "," + ls_num.substring(i - 3, i) + tmp;

    ls_fmtNum = tmp.substring(1, tmp.length);

    if (ls_num_decimal != "")
        ls_fmtNum = ls_fmtNum + ls_num_decimal;
    return ls_fmtNum;
}

function getMaxFieldSize(rLeg) {
    var maxH = horseNames[rLeg[0]].length;
    for (var i = 1; i < rLeg.length; i++) {
        if (rLeg[i] > 0 && maxH < horseNames[rLeg[i]].length)
            maxH = horseNames[rLeg[i]].length;
    }
    return maxH - 1;
}

function sync2TableRowHeight(tObj1, tObj2) {
    try {
        wpTableList[tObj1.id.substring(7)].updateRowHeights();
        wpTableList[tObj2.id.substring(7)].updateRowHeights();
        var tb1 = document.getElementById(tObj1.id + 'InnerTable');
        var tb2 = document.getElementById(tObj2.id + 'InnerTable');
        var trs1 = tb1.getElementsByTagName('tr');
        var trs2 = tb2.getElementsByTagName('tr');
        for (var i = 1; i < trs1.length; i++) {
            var maxH = (tObj1.rowHeights[i]) ? tObj1.rowHeights[i] : 20;
            if (tObj2.rowHeights[i] && maxH < tObj2.rowHeights[i])
                maxH = tObj2.rowHeights[i];
            $(trs1[i].cells[0]).height(maxH);
            $(trs2[i].cells[0]).height(maxH);
        }
    }
    catch (e) { }
}

function sync3TableRowHeight(tObj1, tObj2, tObj3) {
    try {
        wpTableList[tObj1.id.substring(7)].updateRowHeights();
        wpTableList[tObj2.id.substring(7)].updateRowHeights();
        wpTableList[tObj3.id.substring(7)].updateRowHeights();
        var tb1 = document.getElementById(tObj1.id + 'InnerTable');
        var tb2 = document.getElementById(tObj2.id + 'InnerTable');
        var tb3 = document.getElementById(tObj3.id + 'InnerTable');
        var trs1 = tb1.getElementsByTagName('tr');
        var trs2 = tb2.getElementsByTagName('tr');
        var trs3 = tb3.getElementsByTagName('tr');
        for (var i = 0; i < trs1.length; i++) {
            var maxH = (tObj1.rowHeights[i]) ? tObj1.rowHeights[i] : 20;
            if (tObj2.rowHeights[i] && maxH < tObj2.rowHeights[i])
                maxH = tObj2.rowHeights[i];
            if (tObj3.rowHeights[i] && maxH < tObj3.rowHeights[i])
                maxH = tObj3.rowHeights[i];
            $(trs1[i].cells[0]).height(maxH);
            $(trs2[i].cells[0]).height(maxH);
            $(trs3[i].cells[0]).height(maxH);
        }
    }
    catch (e) { }
}

//////////////////////////////////////////////////////////////////////////
//   bet calculator related
//////////////////////////////////////////////////////////////////////////
var useCalculator = false;
function updateBetCalDisplay(betCalId, betNo) {
    var input = document.getElementById('betAmountCalTopUnitBetInput').value;
    var isTotal = false;
    if (document.getElementById('betAmountCalTopFlexiMethod')) {
        isTotal = document.getElementById('betAmountCalTopFlexiMethod').checked;
    }
    if (input != '' && isAllDigits(input) & input > 0 && betNo > 0) {
        var noOfBet, unitBet, total;
        if (!isTotal) {
            noOfBet = document.getElementById('betAmountCalTopNoOfBet');
            unitBet = document.getElementById('betAmountCalTopUnitBet');
            total = document.getElementById('betAmountCalTopTotal');

        	noOfBet.innerHTML = addComma('' + betNo);
        	unitBet.innerHTML = '$ ' + addComma(trimLeftZero(input));
        	total.innerHTML = '$ ' + addComma('' + betNo * input);
        }
        else {
            noOfBet = document.getElementById('betAmountCalTopNoOfBet');            
            unitBet = document.getElementById('betAmountCalTopUnitBet');
            total = document.getElementById('betAmountCalTopTotal');            
            
            noOfBet.innerHTML = addComma('' + betNo);
            var avAmount = parseFloat(input) / parseFloat(betNo);
            unitBet.innerHTML = '$ ' + Math.floor(avAmount*100)/100;
            total.innerHTML = '$ ' + input;
        }
        useCalculator = true;
    }
    else
        useCalculator = false;

    var input = document.getElementById('betAmountCalBottomUnitBetInput').value;
    if (input != '' && isAllDigits(input) & input > 0 && betNo > 0) {
        var noOfBet, unitBet, total;
        if (!isTotal) {
            noOfBet = document.getElementById('betAmountCalBottomNoOfBet');
            unitBet = document.getElementById('betAmountCalBottomUnitBet');
            total = document.getElementById('betAmountCalBottomTotal');

            noOfBet.innerHTML = addComma('' + betNo);
            unitBet.innerHTML = '$ ' + addComma(trimLeftZero(input));
            total.innerHTML = '$ ' + addComma('' + betNo * input);
    	}
        else {
            noOfBet = document.getElementById('betAmountCalBottomNoOfBet');
            unitBet = document.getElementById('betAmountCalBottomUnitBet');
            total = document.getElementById('betAmountCalBottomTotal');

            noOfBet.innerHTML = addComma('' + betNo);
            var avAmount = parseFloat(input) / parseFloat(betNo);
            unitBet.innerHTML = '$ ' + Math.floor(avAmount * 100) / 100;
            total.innerHTML = '$ ' + input;
        }
    }
}

function copyBetAmountInput(id) {
    if (id == 'betAmountCalTop') {
        var obj = document.getElementById('betAmountCalBottomUnitBetInput');
        if (obj != null)
            obj.value = document.getElementById('betAmountCalTopUnitBetInput').value;
    }
    else {
        var obj = document.getElementById('betAmountCalTopUnitBetInput');
        if (obj != null)
            obj.value = document.getElementById('betAmountCalBottomUnitBetInput').value;
    }
}

function betCalReset(pools) {
    try {
        useCalculator = false;
        document.getElementById('betAmountCalTopUnitBetInput').value = getBetslipSettingsBetUnit(pools);
        document.getElementById('betAmountCalTopNoOfBet').innerHTML = '-';
        document.getElementById('betAmountCalTopUnitBet').innerHTML = '-';
        document.getElementById('betAmountCalTopTotal').innerHTML = '-';
    }
    catch (ex) { }

    try {
        document.getElementById('betAmountCalBottomUnitBetInput').value = getBetslipSettingsBetUnit(pools);
        document.getElementById('betAmountCalBottomNoOfBet').innerHTML = '-';
        document.getElementById('betAmountCalBottomUnitBet').innerHTML = '-';
        document.getElementById('betAmountCalBottomTotal').innerHTML = '-';
    }
    catch (ex) { }
}

function getNumberOfBet(pool, betSel, subType, raceNo) {
    if (betSel != '') {
        var betlineShort = new StringBuffer();
        if (subType != null && subType != '')
            betlineShort.append(subType).append(' ');
        if (pool != 'ALUP' && raceNo != '')
            betlineShort.append(raceNo).append('*');
        betlineShort.append(betSel);
        return func_calc_rc_num_of_bet(venueShort + ' ' + dayShort + ' ' + pool + ' ' + betlineShort.toString(), pool);
    }
    return 0;
}

function setDefaultSelection(name, value) {
    setCookie(name, value, 999);
}

function isAllDigits(str) {
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) < '0' || str.charAt(i) > '9')
            return false;
    }
    return true;
}

function isNumeric(strString) {
    var strValidChars = "0123456789.-";
    var strChar;
    var blnResult = true;

    if (strString.length == 0) return false;

    for (i = 0; i < strString.length && blnResult; i++) {
        strChar = strString.charAt(i);
        if (strValidChars.indexOf(strChar) == -1)
            blnResult = false;
    }
    return blnResult;
}

function trimLeftZero(str) {
    var i;
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) != '0')
            break;
    }
    return str.substring(i);
}

function isFlexibet() {
    var flexiObj = document.getElementById('betAmountCalTopFlexiMethod');
    if (flexiObj != null && flexiObj.checked)
        return 1;
    return 0;
}

function getBetCalInput() {
    var input = document.getElementById('betAmountCalTopUnitBetInput');
    if (input != null && isAllDigits(input.value) && parseInt(input.value, 10) > 0)
        return trimLeftZero(input.value);
    return '';
}

function selectBetMethod(method) {
    resetRanGenFlag();
    try {
        if (method == 'flexibet') {
            document.getElementById('betAmountCalTopFlexiMethod').checked = true;
            changeRadioColor('betAmountCalTopRad_', 1, 2);

            //      document.getElementById('betAmountCalTopNoOfBet').innerHTML = '-';
            //      document.getElementById('betAmountCalTopUnitBet').innerHTML = '-';
            //      document.getElementById('betAmountCalTopTotal').innerHTML = '-';

            //      document.getElementById('betAmountCalTopbtn_calculate').style.display = 'none';
            //      document.getElementById('betAmountCalTopbtn_reset').style.display = 'none';
            //      document.getElementById('betAmountCalTopbtn_calculate_off').style.display = 'inline';
            //      document.getElementById('betAmountCalTopbtn_reset_off').style.display = 'inline';
            //var totalAmount = $("betAmountCalTopUnitBetInput").val();
        }
        else {
            if (document.getElementById('betAmountCalTopUnitMethod')) {
                document.getElementById('betAmountCalTopUnitMethod').checked = true;
                changeRadioColor('betAmountCalTopRad_', 2, 2);
            }

            document.getElementById('betAmountCalTopbtn_calculate').style.display = 'inline';
            document.getElementById('betAmountCalTopbtn_reset').style.display = 'inline';
            document.getElementById('betAmountCalTopbtn_calculate_off').style.display = 'none';
            document.getElementById('betAmountCalTopbtn_reset_off').style.display = 'none';
        }
    }
    catch (ex) { }

    try {
        if (method == 'flexibet') {
            document.getElementById('betAmountCalBottomFlexiMethod').checked = true;
            changeRadioColor('betAmountCalBottomRad_', 1, 2);

//            document.getElementById('betAmountCalBottomNoOfBet').innerHTML = '-';
//            document.getElementById('betAmountCalBottomUnitBet').innerHTML = '-';
//            document.getElementById('betAmountCalBottomTotal').innerHTML = '-';

//            document.getElementById('betAmountCalBottombtn_calculate').style.display = 'none';
//            document.getElementById('betAmountCalBottombtn_reset').style.display = 'none';
//            document.getElementById('betAmountCalBottombtn_calculate_off').style.display = 'inline';
//            document.getElementById('betAmountCalBottombtn_reset_off').style.display = 'inline';
        }
        else {
            if (document.getElementById('betAmountCalBottomUnitMethod')) {
                document.getElementById('betAmountCalBottomUnitMethod').checked = true;
                changeRadioColor('betAmountCalBottomRad_', 2, 2);
            }

            document.getElementById('betAmountCalBottombtn_calculate').style.display = 'inline';
            document.getElementById('betAmountCalBottombtn_reset').style.display = 'inline';
            document.getElementById('betAmountCalBottombtn_calculate_off').style.display = 'none';
            document.getElementById('betAmountCalBottombtn_reset_off').style.display = 'none';
        }
    }
    catch (ex) { }
}

//////////////////////////////////////////////////////////////////////////
//   Cookie function
//////////////////////////////////////////////////////////////////////////
var WPQ_COOKIE_NAME = 'WPQ_sel';
var TCE_COOKIE_NAME = 'TCE_sel';
var T_T_COOKIE_NAME = 'TT_sel';
var TRI_COOKIE_NAME = 'TRI_sel';
var F_F_COOKIE_NAME = 'FF_sel';

function getCookie(name) {
    var start = document.cookie.indexOf(name + "=");
    var len = start + name.length + 1;
    if ((!start) && (name != document.cookie.substring(0, name.length))) {
        return '';
    }
    if (start == -1) return '';
    var end = document.cookie.indexOf(";", len);
    if (end == -1) end = document.cookie.length;
    return unescape(document.cookie.substring(len, end));
}

function setCookie(name, value) {
    var today = new Date();
    today.setTime(today.getTime());
    var expires = 999 * 1000 * 60 * 60 * 24;
    var expires_date = new Date(today.getTime() + (expires));
    document.cookie = name + "=" + escape(value) + ";expires=" + expires_date.toGMTString();
}

//////////////////////////////////////////////////////////////////////////
//  Add Bet function, interactive with AddBetCtrl.ascx
//////////////////////////////////////////////////////////////////////////
var indentStrSt = '<div style="padding-left:32px">';
var indentStrEd = '</div>';

function isSingleRacePool(pool) {
    return singleRacePoolList.indexOf(pool) >= 0;
}

function processQuickBet(pool, raceNo, sel1, sel2) {
    var betSel = '';
    switch (pool) {
        case 'WIN':
        case 'PLA':
            betSel = '' + sel1;
            break;
        case 'QIN':
        case 'QPL':
        case 'TRI':
        case 'F-F':
        case 'TCE':
            betSel = sel1.replace(/-/g, '+');
            break;
        case 'DBL':
            betSel = sel1 + '/' + sel2;
            break;
    }
    if(pool != 'TCE')
        addToBetslip(pool, '', raceNo, betSel, 1, ' $' + getBetslipSettingsBetUnit(pool), 0);
    else
        addToBetslip(pool + ' S', '', raceNo, betSel, 0);
}

function addToBetslip(poolShort, poolLong, raceNo, betSel, allupflag, unitbet, isRandGen, ignoreFlexibet) {
    if (isRandGen == null)
        isRandGen = 0;

    if (ignoreFlexibet == null)
        ignoreFlexibet = 0;

    var poolLong1 = shortPoolNames[poolShort];
    var poolLong2 = longPoolNames[poolShort];
    var betlineShort = venueShort + ' ' + dayShort + ' ' + poolShort + ' ' + raceNo + '*' + betSel;
    var betLineDesc1 = poolLong1 + ' ' + raceNoLong.replace('#', raceNo);
    var betLineDesc2 = betSel;
    if (poolLong != null && poolLong != '')
        poolLong2 = poolLong;
    var betLineLong = venueLong + ' ' + dayLong + '<BR>'
                  + (isSingleRacePool(poolShort) ? '' : (poolLong2 + '<BR>')) + parseBet(poolShort, poolLong2, raceNo, betSel);

    if (isRandGen == 1)
        betLineLong += randNum;

    var ub = getBetCalInput();
    if (!ignoreFlexibet && isFlexibet() && ub == '') {
        alert(calInvAmtLbl);
        return 0;
    }

    if (useCalculator || unitbet == null || unitbet == '') {
        unitbet = '';
        if (ub != '')
            unitbet = ' $' + ub;

        useCalculator = false;
    }

    if (addBetDebug)
        alert(betlineShort + '\n' + betLineLong + '\n' + betLineDesc1 + '\n' + betLineDesc2
          + '\nisAllup : ' + allupflag + '\nisRandGen : ' + isRandGen
          + '\nisFlexibet : ' + isFlexibet() + '\nunitbet : ' + unitbet);

    try {
        // alert(top.betSlipFrame.addSelEx);
        return top.betSlipFrame.addSelEx(betlineShort + unitbet, betLineLong, betLineDesc1, betLineDesc2,
           allupflag, 0, 0, 0, isRandGen, '', isFlexibet());

    }
    catch (e) { }
    return 1;
}

function addToBetslipAlup(poolShort, formula, betSel, unitbet, isRandGen) {
    if (isRandGen == null)
        isRandGen = 0;

    var poolLong = shortPoolNames[poolShort];
    var betlineShort = venueShort + ' ' + dayShort + ' ' + poolShort + ' ' + formula + '/' + betSel;
    var betLineDesc1 = alupLong + ' ' + formula;
    var betLineDesc2 = betSel;
    var betLineLong = venueLong + ' ' + dayLong + '<BR>'
                  + alupLong + ' ' + formula + '<BR>' + parseAlupBetSelection(formula, betSel);

    var ub = getBetCalInput();
    if (isFlexibet() && ub == '') {
        alert(calInvAmtLbl);
        return 0;
    }

    if (unitbet == null || unitbet == '') {
        unitbet = '';
        if (ub != '')
            unitbet = ' $' + ub;
    }

    if (addBetDebug)
        alert(betlineShort + '\n' + betLineLong + '\n' + betLineDesc1 + '\n' + betLineDesc2
          + '\nisRandGen : ' + isRandGen + '\nisFlexibet : ' + isFlexibet() + '\nunitbet : ' + unitbet);

    try {
        return top.betSlipFrame.addSelEx(betlineShort + unitbet, betLineLong, betLineDesc1, betLineDesc2,
           0, 0, 0, 0, isRandGen, '', isFlexibet());
    }
    catch (e) { ; }
    return 1;
}

function parseAlupBetSelection(formula, betSel) {
    var longBet = new StringBuffer();
    var betS = betSel.split('/');
    for (var i = 0; i < betS.length; i++) {
        var splitPool = betS[i].split(' ');
        var splitRace = splitPool[1].split('*');
        longBet.append(raceNoLong.replace('#', splitRace[0])).append(' ');
        longBet.append(longPoolNames[splitPool[0]]).append('<BR>');
        longBet.append(parseBanker(splitRace[0], splitRace[1]));
    }
    return longBet.toString();
}

function parseBet(pool, poolLong, raceNo, betSel) {
    var longBet = new StringBuffer();
    var betS = betSel.split('|');
    for (var i = 0; i < betS.length; i++) {
        if (i > 0)
            longBet.append('<BR>');
        longBet.append(parseRace(pool, poolLong, raceNo, betS[i]));
    }
    return longBet.toString();
}

function parseRace(pool, poolLong, raceNo, betSel) {
    var longBet = new StringBuffer();
    var betS = betSel.split('/');
    for (var i = 0; i < betS.length; i++) {
        var r = raceNo;
        if (i > 0)
            r = raceLeg[i];
        longBet.append(raceNoLong.replace('#', r))
           .append(isSingleRacePool(pool) ? (' ' + poolLong) : '').append('<BR>');
        longBet.append(parseBanker(r, betS[i]));
    }
    return longBet.toString();
}

function parseBanker(raceNo, betSel) {
    var longBet = new StringBuffer();
    var betS = betSel.split('>');
    for (var i = 0; i < betS.length; i++) {
        if (i > 0)
            longBet.append(indentStrSt).append(withBanker).append(indentStrEd);
        longBet.append(parseLeg(raceNo, betS[i]));
    }
    return longBet.toString();
}

function parseLeg(raceNo, betSel) {
    var longBet = new StringBuffer();
    var betLeg = betSel.split('+');

    for (var i = 0; i < betLeg.length; i++) {
        longBet.append(indentStrSt).append(betLeg[i]).append(' ');
        if (betLeg[i] == 'F')
            longBet.append(labelField);
        else {
            var r = parseInt(raceNo, 10);
            var l = parseInt(betLeg[i], 10);
            var bHorseNames = (horseNames[r][l] != null ? horseNames[r][l].split('/') : new Array());
            var bHorseCodes = (horseCodes[r][l] != null ? horseCodes[r][l].split('/') : new Array());
            var bHorseStats = (horseStats[r][l] != null ? horseStats[r][l].split('/') : new Array());
            for (var j = 0; j < bHorseNames.length; j++) {
                if (j > 0)
                    longBet.append('/');
                if (isOverseaMeeting)
                    longBet.append('(').append(bHorseCodes[j]).append(')');
                longBet.append(bHorseNames[j]);
                try {
                    if (bHorseStats[j].indexOf('R') >= 0)
                        longBet.append('(').append(reserveLbl).append(')');
                } catch (e) { }
                try{
                    if (bHorseStats[j].indexOf('S') >= 0)
                        longBet.append('(').append(scratchLbl).append(')');
                } catch (e) { }
            }
        }
        longBet.append(indentStrEd);
    }
    return longBet.toString();
}

function validateBet(pool, tableId, bankerNo, legNo, promptError) {
    switch (pool) {
        case 'WIN':
        case 'PLA':
        case 'W-P':
        case 'DBL':
        case 'TBL':
        case '6UP':
            if (legNo <= 0) {
                if (promptError)
                    alert(insuffSLbl.replace('#', tableId));
                return false;
            }
            break;
        case 'QIN':
        case 'QPL':
        case 'QQP':
            if (bankerNo > 1) {
                if (promptError)
                    alert(tooManyBLbl.replace('#', tableId));
                return false;
            }
            if (legNo < 2) {
                if (promptError)
                    alert(insuffSLbl.replace('#', tableId));
                return false;
            }
            break;
        case 'TRI':
        case 'D-T':
        case 'T-T':
            if (bankerNo > 2) {
                if (promptError)
                    alert(tooManyBLbl.replace('#', tableId));
                return false;
            }
            if (bankerNo == 0 && legNo < 3) {
                if (promptError)
                    alert(insuffSLbl.replace('#', tableId));
                return false;
            }
            if (bankerNo > 0 && bankerNo + legNo < 4) {
                if (promptError)
                    alert(insuffSLbl.replace('#', tableId));
                return false;
            }
            break;
        case 'F-F':
            if (bankerNo > 3) {
                if (promptError)
                    alert(tooManyBLbl.replace('#', tableId));
                return false;
            }
            if (bankerNo == 0 && legNo < 4) {
                if (promptError)
                    alert(insuffSLbl.replace('#', tableId));
                return false;
            }
            if (bankerNo > 0 && bankerNo + legNo < 5) {
                if (promptError)
                    alert(insuffSLbl.replace('#', tableId));
                return false;
            }
            break;
        default:
            break;
    }
    return true;
}

///////////////////////////////////////////////////
// Odds Display Panel for QIN/QPL, TRIO & FIRST 4, TCE
///////////////////////////////////////////////////
function genOddsDisplayPanel(pool, top20Enable, top20Lbl, banker10Enable, banker10Lbl, allEnable, allLabel, investmentEnable, investmentLabel) {
    investmentEnable = investmentEnable === undefined ? false : investmentEnable;
    investmentLabel = investmentLabel === undefined ? '' : investmentLabel;
    var totalEnable = (top20Enable ? 1 : 0) + (banker10Enable ? 1 : 0) + (allEnable ? 1 : 0) + (investmentEnable ? 1 : 0);
    var idx = 1;

    var buf = new StringBuffer();
    buf.append('<table height="22" border="0" cellspacing="0" cellpadding="0"><tr>');
    if (top20Enable) {
        buf.append('<td id="').append(pool).append('radTd_').append(idx).append('" style="PADDING-RIGHT:15px; PADDING-LEFT:10px; PADDING-BOTTOM:0px; PADDING-TOP:0px">');
        buf.append('<input name="').append(pool).append('triRadio" id="')
       .append(pool).append('top20" type="radio" value="top20" onClick="changeRadioColor(\'')
       .append(pool).append('radTd_\', ');
        buf.append(idx++).append(', ');
        buf.append(totalEnable).append(');selectTriRadio(0, true, \'').append(pool).append('\');" checked>');
        buf.append('<label for="').append(pool).append('top20">').append(top20Lbl).append('</label></td>');
    }
    if (banker10Enable) {
        buf.append('<td id="').append(pool).append('radTd_').append(idx).append('" style="PADDING-RIGHT:15px; PADDING-LEFT:10px; PADDING-BOTTOM:0px; PADDING-TOP:0px">');
        buf.append('<input name="').append(pool).append('triRadio" id="')
       .append(pool).append('banker10" type="radio" value="banker10" onClick="changeRadioColor(\'')
       .append(pool).append('radTd_\', ');
        buf.append(idx++).append(', ');
        buf.append(totalEnable).append(');selectTriRadio(1, true, \'').append(pool).append('\');">');
        buf.append('<label for="').append(pool).append('banker10">').append(banker10Lbl).append('</label></td>');
    }
    if (allEnable) {
        buf.append('<td id="').append(pool).append('radTd_').append(idx).append('" style="PADDING-RIGHT:15px; PADDING-LEFT:10px; PADDING-BOTTOM:0px; PADDING-TOP:0px">');
        buf.append('<input name="').append(pool).append('triRadio" id="')
       .append(pool).append('all" type="radio" value="all" onClick="changeRadioColor(\'')
       .append(pool).append('radTd_\', ');
        buf.append(idx++).append(', ');
        buf.append(totalEnable).append(');selectTriRadio(2, true, \'').append(pool).append('\');">');
        buf.append('<label for="').append(pool).append('all">').append(allLabel).append('</label></td>');
    }
    if (investmentEnable) {
        buf.append('<td id="').append(pool).append('radTd_').append(idx).append('" style="PADDING-RIGHT:15px; PADDING-LEFT:10px; PADDING-BOTTOM:0px; PADDING-TOP:0px">');
        buf.append('<input name="').append(pool).append('triRadio" id="')
       .append(pool).append('investment" type="radio" value="all" onClick="changeRadioColor(\'')
       .append(pool).append('radTd_\', ');
        buf.append(idx++).append(', ');
        buf.append(totalEnable).append(');selectTriRadio(4, true, \'').append(pool).append('\');">');
        buf.append('<label for="').append(pool).append('investment">').append(investmentLabel).append('</label></td>');
    }    
    buf.append('</tr></table>');
    return buf.toString();
}

///////////////////////////////////////////////////
// Paging
///////////////////////////////////////////////////
function genPaging(pool) {
    var prevLbl = combTable[pool].prevLbl;
    var nextLbl = combTable[pool].nextLbl;
    var buf = new StringBuffer();

    // get paging range
    var pagingSize = 5;
    if (pagingSize > combTable[pool].noOfPage)
        pagingSize = combTable[pool].noOfPage;
    var startNo = combTable[pool].curPage - 2;
    var endNo = combTable[pool].curPage + 2;
    if (startNo < 1) {
        startNo = 1;
        endNo = pagingSize;
    }
    else if (endNo > combTable[pool].noOfPage) {
        startNo = combTable[pool].noOfPage - pagingSize + 1;
        endNo = combTable[pool].noOfPage;
    }

    // draw paging
    buf.append('<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr>');
    buf.append('<td class="whiteBar" align="right" class="gray">');
    buf.append('<a href="javascript:goPage(\'').append(pool).append('\', ').append(combTable[pool].curPage - 1).append(');" class="pagination">')
     .append('&lt;&lt;').append(prevLbl).append('</a> ');

    for (var i = startNo; i <= endNo; i++) {
        if (i == combTable[pool].curPage)
            buf.append('  |  <a href="#" class="paginationCurrent"><strong>').append(i).append('</strong></a>');
        else
            buf.append('  |  <a href="javascript:goPage(\'').append(pool).append('\', ').append(i).append(');" class="pagination">').append(i).append('</a>');
    }

    buf.append('  |   <a href="javascript:goPage(\'').append(pool).append('\', ').append(combTable[pool].curPage + 1).append(');" class="pagination">')
     .append(nextLbl).append('&gt;&gt;</a> ');

    buf.append('</td></tr></table>');
    return buf.toString();
}

function goPage(pool, page) {
    if (page < 1 || page > combTable[pool].noOfPage)
        return;
    combTable[pool].curPage = page;
    if (combTable[pool].curFunc == 2 || combTable[pool].curFunc == 3) {
        var tStart = (combTable[pool].curPage - 1) * 48 + 1;
        var tEnd = (combTable[pool].curPage - 1) * 48 + 48;
        combTable[pool].urlPara = combPara[combTable[pool].curFunc] + '&start=' + tStart + '&end=' + tEnd;
    }
    combTable[pool].clearTable();

    if (isPull || !isConnectedAMS || (pool != 'TRI' && pool != 'F-F' && pool != 'TCE')) {
        combOddsLoadDocImp(pool);
    }
    else { //for odds push
        var str = "";
        if (combTable[pool].curFunc == 0)
            str = combOdds;
        else if (combTable[pool].curFunc == 1)
            str = combOddsBanker10;
        else if (combTable[pool].curFunc == 2 || combTable[pool].curFunc == 3) {
            var startIndex = 48 * (page - 1) + 1;
            var endIndex = (startIndex + 48 > combAll.split(';').length - 1 ? combAll.split(';').length - 1 : startIndex + 48);
            for (var i = startIndex; i <= endIndex; i++) {
                str += ";" + combAll.split(';')[i];
            }
            str = combAll.split(';')[0] + str;
        }
        else if (combTable[pool].curFunc == 4)
            str = combInvestment;
            
        combOddsRefreshPush(str, pool);
    }
}

function genPagingDBL() {
    var prevLbl = dblOddsTable.prevLbl;
    var nextLbl = dblOddsTable.nextLbl;
    var buf = new StringBuffer();

    // draw paging
    buf.append('<table style="padding-top:10px" width="100%" border="0" cellspacing="0" cellpadding="0"><tr>');
    buf.append('<td class="gray" align="right" class="gray">');
    if (dblOddsTable.curPage == 1)
        buf.append('&lt;&lt;').append('<span class="paginationCurrent">').append(prevLbl).append('</span> ');
    else
        buf.append('<a href="javascript:goPageDBL(1);" class="pagination">').append('&lt;&lt;').append(prevLbl).append('</a> ');

    if (dblOddsTable.curPage == 2)
        buf.append('<span class="paginationCurrent">').append(nextLbl).append('</span>').append('&gt;&gt;');
    else
        buf.append('<a href="javascript:goPageDBL(2);" class="pagination">').append(nextLbl).append('&gt;&gt;').append('</a>');

    buf.append('</td></tr></table>');
    return buf.toString();
}

function goPageDBL(page) {
    dblOddsTable.curPage = page;
    dblOddsTable.clearTable();
    dblLoadDocImp();
}

//////////////////////////////////////////////////////////////////////////
//   StringBuffer object
//////////////////////////////////////////////////////////////////////////
function StringBuffer() {
    this.data = [];
}

StringBuffer.prototype.append = function() {
    this.data.push(arguments[0]);
    return this;
}

StringBuffer.prototype.toString = function() {
    return this.data.join("");
}

StringBuffer.prototype.isEmpty = function() {
    return this.data.length == 0;
}


/************************  odds push function start   ****************************/

var AMS = {
    hadConnected: false,
    connect: function() {
        top.status = "push";
        var engine_frame = top.document.getElementById('div_engine');
        if (engine_frame != null && engine_frame.innerHTML == "") {
            engine_frame.innerHTML = "<iframe src=\"/info/Include/js/commons/custom/engine_container.html\" id=\"push_engine\" style=\"display:none\" /></iframe>";
            this.hadConnected = true;
        }
    },
    disconnect: function() {
        var engine_frame = top.document.getElementById('div_engine');
        if (engine_frame != null && engine_frame.innerHTML != "") {
            if (top.document.getElementById('betSlipFrame')) {
                top.document.getElementById('betSlipFrame').contentWindow.CloseLogoutPopup();
            }
            top.status = "poll";
            engine_frame.innerHTML = "";
            this.hadConnected = false;
            window.location.href = window.location.href;
        }
    },
    Intermited: function() {
        var engine_frame = top.document.getElementById('div_engine');
        if (engine_frame != null && engine_frame.innerHTML != "") {
            if (top.document.getElementById('betSlipFrame')) {
                top.document.getElementById('betSlipFrame').contentWindow.CloseLogoutPopup();
            }
            top.status = "poll";
            engine_frame.innerHTML = "";
            this.hadConnected = false;
            //window.location.href = window.location.href;
        }
    }
}

//check odds status whether it's disabled
function isDisabled(_status) {
    isSelling = _status.charAt(0);
    isIrrational = _status.charAt(2);
    return (isSelling == "0" || isIrrational == "1");
}

function GetGlobalResources(_key, _type) {
    try {
        var type = "js";
        if (_type != null && _type != "" && _type != undefined) {
            type = _type;
        }
        var text = eval(type + _key);
        if (text == "" || text == undefined || text == null) {
            return _key;
        }
        return text;
    }
    catch (e) {
        return _key;
    }
}

function refreshSellStatus(sellStat) {
    for (var i = 1; i < wpTableList.length; i++) {
        if (wpTableList[i] != null) {
            wpTableList[i].startSell = (sellStat[0] == '1') ? 1 : 0;
            wpTableList[i].sellStatus = wpTableList[i].singleRace ? sellStat[wpTableList[i].firstLeg] : sellStat[i];
            wpTableList[i].setInnerTableHtml();
        }
    }

    if (isEditBetMode && typeof openEditOddsContent == 'function') {
        openEditOddsContent();
    }
}
/************************  odds push function end   ****************************/
