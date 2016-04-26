
/*
    Default template driver for JS/CC generated parsers running as
    browser-based JavaScript/ECMAScript applications.
    
    WARNING:     This parser template will not run as console and has lesser
                features for debugging than the console derivates for the
                various JavaScript platforms.
    
    Features:
    - Parser trace messages
    - Integrated panic-mode error recovery
    
    Written 2007, 2008 by Jan Max Meyer, J.M.K S.F. Software Technologies
    
    This is in the public domain.
*/

var _dbg_withtrace        = false;
var _dbg_string            = new String();

function __dbg_print( text )
{
    _dbg_string += text + "\n";
}

function __lex( info )
{
    var state        = 0;
    var match        = -1;
    var match_pos    = 0;
    var start        = 0;
    var pos            = info.offset + 1;

    do
    {
        pos--;
        state = 0;
        match = -2;
        start = pos;

        if( info.src.length <= start )
            return 10;

        do
        {

switch( state )
{
    case 0:
        if( info.src.charCodeAt( pos ) == 9 || info.src.charCodeAt( pos ) == 32 ) state = 1;
        else if( info.src.charCodeAt( pos ) == 40 ) state = 2;
        else if( info.src.charCodeAt( pos ) == 41 ) state = 3;
        else if( info.src.charCodeAt( pos ) == 42 ) state = 4;
        else if( info.src.charCodeAt( pos ) == 43 ) state = 5;
        else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) ) state = 6;
        else if( info.src.charCodeAt( pos ) == 46 ) state = 8;
        else state = -1;
        break;

    case 1:
        state = -1;
        match = 1;
        match_pos = pos;
        break;

    case 2:
        state = -1;
        match = 2;
        match_pos = pos;
        break;

    case 3:
        state = -1;
        match = 3;
        match_pos = pos;
        break;

    case 4:
        state = -1;
        match = 7;
        match_pos = pos;
        break;

    case 5:
        state = -1;
        match = 6;
        match_pos = pos;
        break;

    case 6:
        if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) ) state = 6;
        else if( info.src.charCodeAt( pos ) == 46 ) state = 7;
        else state = -1;
        match = 4;
        match_pos = pos;
        break;

    case 7:
        if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) ) state = 7;
        else state = -1;
        match = 5;
        match_pos = pos;
        break;

    case 8:
        if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) ) state = 7;
        else state = -1;
        break;

}


            pos++;

        }
        while( state > -1 );

    }
    while( 1 > -1 && match == 1 );

    if( match > -1 )
    {
        info.att = info.src.substr( start, match_pos - start );
        info.offset = match_pos;
        
switch( match )
{
    case 4:
        {
         info.att = parseInt( info.att );
        }
        break;

    case 5:
        {
         info.att = parseFloat( info.att );
        }
        break;

}


    }
    else
    {
        info.att = new String();
        match = -1;
    }

    return match;
}


function __parse( src, err_off, err_la )
{
    var        sstack            = new Array();
    var        vstack            = new Array();
    var     err_cnt            = 0;
    var        act;
    var        go;
    var        la;
    var        rval;
    var     parseinfo        = new Function( "", "var offset; var src; var att;" );
    var        info            = new parseinfo();
    
/* Pop-Table */
var pop_tab = new Array(
    new Array( 0/* p' */, 1 ),
    new Array( 9/* p */, 1 ),
    new Array( 8/* e */, 3 ),
    new Array( 8/* e */, 3 ),
    new Array( 8/* e */, 3 ),
    new Array( 8/* e */, 1 ),
    new Array( 8/* e */, 1 )
);

/* Action-Table */
var act_tab = new Array(
    /* State 0 */ new Array( 2/* "(" */,3 , 4/* "INT" */,4 , 5/* "FLOAT" */,5 ),
    /* State 1 */ new Array( 10/* "$" */,0 ),
    /* State 2 */ new Array( 7/* "*" */,6 , 6/* "+" */,7 , 10/* "$" */,-1 ),
    /* State 3 */ new Array( 2/* "(" */,3 , 4/* "INT" */,4 , 5/* "FLOAT" */,5 ),
    /* State 4 */ new Array( 10/* "$" */,-5 , 6/* "+" */,-5 , 7/* "*" */,-5 , 3/* ")" */,-5 ),
    /* State 5 */ new Array( 10/* "$" */,-6 , 6/* "+" */,-6 , 7/* "*" */,-6 , 3/* ")" */,-6 ),
    /* State 6 */ new Array( 2/* "(" */,3 , 4/* "INT" */,4 , 5/* "FLOAT" */,5 ),
    /* State 7 */ new Array( 2/* "(" */,3 , 4/* "INT" */,4 , 5/* "FLOAT" */,5 ),
    /* State 8 */ new Array( 7/* "*" */,6 , 6/* "+" */,7 , 3/* ")" */,11 ),
    /* State 9 */ new Array( 7/* "*" */,-3 , 6/* "+" */,-3 , 10/* "$" */,-3 , 3/* ")" */,-3 ),
    /* State 10 */ new Array( 7/* "*" */,6 , 6/* "+" */,-2 , 10/* "$" */,-2 , 3/* ")" */,-2 ),
    /* State 11 */ new Array( 10/* "$" */,-4 , 6/* "+" */,-4 , 7/* "*" */,-4 , 3/* ")" */,-4 )
);

/* Goto-Table */
var goto_tab = new Array(
    /* State 0 */ new Array( 9/* p */,1 , 8/* e */,2 ),
    /* State 1 */ new Array( ),
    /* State 2 */ new Array( ),
    /* State 3 */ new Array( 8/* e */,8 ),
    /* State 4 */ new Array( ),
    /* State 5 */ new Array( ),
    /* State 6 */ new Array( 8/* e */,9 ),
    /* State 7 */ new Array( 8/* e */,10 ),
    /* State 8 */ new Array( ),
    /* State 9 */ new Array( ),
    /* State 10 */ new Array( ),
    /* State 11 */ new Array( )
);



/* Symbol labels */
var labels = new Array(
    "p'" /* Non-terminal symbol */,
    "WHITESPACE" /* Terminal symbol */,
    "(" /* Terminal symbol */,
    ")" /* Terminal symbol */,
    "INT" /* Terminal symbol */,
    "FLOAT" /* Terminal symbol */,
    "+" /* Terminal symbol */,
    "*" /* Terminal symbol */,
    "e" /* Non-terminal symbol */,
    "p" /* Non-terminal symbol */,
    "$" /* Terminal symbol */
);


    
    info.offset = 0;
    info.src = src;
    info.att = new String();
    
    if( !err_off )
        err_off    = new Array();
    if( !err_la )
    err_la = new Array();
    
    sstack.push( 0 );
    vstack.push( 0 );
    
    la = __lex( info );

    while( true )
    {
        act = 13;
        for( var i = 0; i < act_tab[sstack[sstack.length-1]].length; i+=2 )
        {
            if( act_tab[sstack[sstack.length-1]][i] == la )
            {
                act = act_tab[sstack[sstack.length-1]][i+1];
                break;
            }
        }

        if( _dbg_withtrace && sstack.length > 0 )
        {
            __dbg_print( "\nState " + sstack[sstack.length-1] + "\n" +
                            "\tLookahead: " + labels[la] + " (\"" + info.att + "\")\n" +
                            "\tAction: " + act + "\n" +
                            "\tSource: \"" + info.src.substr( info.offset, 30 ) + ( ( info.offset + 30 < info.src.length ) ?
                                    "..." : "" ) + "\"\n" +
                            "\tStack: " + sstack.join() + "\n" +
                            "\tValue stack: " + vstack.join() + "\n" );
        }
        
            
        //Panic-mode: Try recovery when parse-error occurs!
        if( act == 13 )
        {
            if( _dbg_withtrace )
                __dbg_print( "Error detected: There is no reduce or shift on the symbol " + labels[la] );
            
            err_cnt++;
            err_off.push( info.offset - info.att.length );            
            err_la.push( new Array() );
            for( var i = 0; i < act_tab[sstack[sstack.length-1]].length; i+=2 )
                err_la[err_la.length-1].push( labels[act_tab[sstack[sstack.length-1]][i]] );
            
            //Remember the original stack!
            var rsstack = new Array();
            var rvstack = new Array();
            for( var i = 0; i < sstack.length; i++ )
            {
                rsstack[i] = sstack[i];
                rvstack[i] = vstack[i];
            }
            
            while( act == 13 && la != 10 )
            {
                if( _dbg_withtrace )
                    __dbg_print( "\tError recovery\n" +
                                    "Current lookahead: " + labels[la] + " (" + info.att + ")\n" +
                                    "Action: " + act + "\n\n" );
                if( la == -1 )
                    info.offset++;
                    
                while( act == 13 && sstack.length > 0 )
                {
                    sstack.pop();
                    vstack.pop();
                    
                    if( sstack.length == 0 )
                        break;
                        
                    act = 13;
                    for( var i = 0; i < act_tab[sstack[sstack.length-1]].length; i+=2 )
                    {
                        if( act_tab[sstack[sstack.length-1]][i] == la )
                        {
                            act = act_tab[sstack[sstack.length-1]][i+1];
                            break;
                        }
                    }
                }
                
                if( act != 13 )
                    break;
                
                for( var i = 0; i < rsstack.length; i++ )
                {
                    sstack.push( rsstack[i] );
                    vstack.push( rvstack[i] );
                }
                
                la = __lex( info );
            }
            
            if( act == 13 )
            {
                if( _dbg_withtrace )
                    __dbg_print( "\tError recovery failed, terminating parse process..." );
                break;
            }


            if( _dbg_withtrace )
                __dbg_print( "\tError recovery succeeded, continuing" );
        }
        
        /*
        if( act == 13 )
            break;
        */
        
        
        //Shift
        if( act > 0 )
        {            
            if( _dbg_withtrace )
                __dbg_print( "Shifting symbol: " + labels[la] + " (" + info.att + ")" );
        
            sstack.push( act );
            vstack.push( info.att );
            
            la = __lex( info );
            
            if( _dbg_withtrace )
                __dbg_print( "\tNew lookahead symbol: " + labels[la] + " (" + info.att + ")" );
        }
        //Reduce
        else
        {        
            act *= -1;
            
            if( _dbg_withtrace )
                __dbg_print( "Reducing by producution: " + act );
            
            rval = void(0);
            
            if( _dbg_withtrace )
                __dbg_print( "\tPerforming semantic action..." );
            
switch( act )
{
    case 0:
    {
        rval = vstack[ vstack.length - 1 ];
    }
    break;
    case 1:
    {
         alert( vstack[ vstack.length - 1 ] );
    }
    break;
    case 2:
    {
         rval = vstack[ vstack.length - 3 ] + vstack[ vstack.length - 1 ];
    }
    break;
    case 3:
    {
         rval = vstack[ vstack.length - 3 ] * vstack[ vstack.length - 1 ];
    }
    break;
    case 4:
    {
         rval = vstack[ vstack.length - 2 ];
    }
    break;
    case 5:
    {
        rval = vstack[ vstack.length - 1 ];
    }
    break;
    case 6:
    {
        rval = vstack[ vstack.length - 1 ];
    }
    break;
}



            if( _dbg_withtrace )
                __dbg_print( "\tPopping " + pop_tab[act][1] + " off the stack..." );
                
            for( var i = 0; i < pop_tab[act][1]; i++ )
            {
                sstack.pop();
                vstack.pop();
            }
                                    
            go = -1;
            for( var i = 0; i < goto_tab[sstack[sstack.length-1]].length; i+=2 )
            {
                if( goto_tab[sstack[sstack.length-1]][i] == pop_tab[act][0] )
                {
                    go = goto_tab[sstack[sstack.length-1]][i+1];
                    break;
                }
            }
            
            if( act == 0 )
                break;
                
            if( _dbg_withtrace )
                __dbg_print( "\tPushing non-terminal " + labels[ pop_tab[act][0] ] );
                
            sstack.push( go );
            vstack.push( rval );            
        }
        
        if( _dbg_withtrace )
        {        
            alert( _dbg_string );
            _dbg_string = new String();
        }
    }

    if( _dbg_withtrace )
    {
        __dbg_print( "\nParse complete." );
        alert( _dbg_string );
    }
    
    return err_cnt;
}


var error_offsets = new Array(); var error_lookaheads = new Array(); var error_count = 0; var str = prompt( "Please enter a string to be parsed:", "" ); if( ( error_count = __parse( str, error_offsets, error_lookaheads ) ) > 0 ) { var errstr = new String(); for( var i = 0; i < error_count; i++ ) errstr += "Parse error in line " + ( str.substr( 0, error_offsets[i] ).match( /\n/g ) ? str.substr( 0, error_offsets[i] ).match( /\n/g ).length : 1 ) + " near \"" + str.substr( error_offsets[i] ) + "\", expecting \"" + error_lookaheads[i].join() + "\"\n" ; alert( errstr );}