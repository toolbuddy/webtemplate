import header from 'static/src/js/components/common/header/index.js';
import { singleDefaultTagFilter, } from 'static/src/js/components/announcement/filter/index.js';

header( document.getElementById( 'header' ) );

singleDefaultTagFilter(
    'phd',
    document.getElementById( 'announcement__brefings--top' ),
    document.getElementById( 'announcement__brefings' ),
    6,
    6,
    document.getElementById( 'filter__tags' ),
    [
        'award',
        'competition',
        'conference',
        'exhibition',
        'international',
        'internship',
        'phd',
        'rule',
        'scholarship',
        'speech',
    ]
);
