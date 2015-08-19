/**
 * Created by s.zhitenev on 18.08.2015.
 */

console.log(window);
var vcsgraph = new VCSGraph({canvasId: 'canvas'});

vcsgraph.newChannel({
    id: 5,
    name: 'dev'
});
vcsgraph.newChannel({
    id: 6,
    name: 'test'
});
vcsgraph.newChannel({
    id: 7,
    name: 'stable'
});

vcsgraph.newVersion({
    id: 1,
    name: '0.0.0',
    channels: [
        {
            id: 1,
            name: 'dev',
            published: '2015-08-03T00:04:00.000+03:00'
        }
    ],
    next: [
        {
            id: 2,
            name: '0.0.1'
        },
        {
            id: 3,
            name: '0.1.0'
        }
    ],
    prev: []
});
vcsgraph.newVersion({
    id: 2,
    name: '0.0.1',
    channels: [
        {
            id: 1,
            name: 'dev',
            published: '2015-08-03T01:02:00.000+03:00'
        }
    ],
    next: [
        {
            id: 3,
            name: '0.1.0'
        }
    ],
    prev: [
        {
            id: 1,
            name: '0.0.0'
        }
    ]
});
vcsgraph.newVersion({
    id: 3,
    name: '0.1.0',
    channels: [
        {
            id: 1,
            name: 'dev',
            published: '2015-08-03T12:32:00.000+03:00'
        },
        {
            id: 2,
            name: 'test',
            published: '2015-09-03T07:40:00.000+03:00'
        }
    ],
    next: [
    ],
    prev: [
        {
            id: 1,
            name: '0.0.0'
        },
        {
            id: 2,
            name: '0.0.1'
        }
    ]
});
vcsgraph.newVersion({
    id: 3,
    name: '0.1.0',
    channels: [
        {
            id: 2,
            name: 'test',
            published: '2015-09-03T10:40:00.000+03:00'
        }
    ],
    next: [
    ],
    prev: [
        {
            id: 1,
            name: '0.0.0'
        },
        {
            id: 2,
            name: '0.0.1'
        }
    ]
});
vcsgraph.newVersion({
    id: 3,
    name: '0.1.0',
    channels: [
        {
            id: 2,
            name: 'test',
            published: '2015-09-03T10:40:00.000+03:00'
        }
    ],
    next: [
    ],
    prev: [
        {
            id: 1,
            name: '0.0.0'
        },
        {
            id: 2,
            name: '0.0.1'
        }
    ]
});
vcsgraph.newVersion({
    id: 4,
    name: '0.2.0',
    channels: [
        {
            id: 3,
            name: 'stable',
            published: '2015-10-03T12:40:00.000+03:00'
        }
    ],
    next: [
    ],
    prev: [
        {
            id: 1,
            name: '0.0.0'
        },
        {
            id: 2,
            name: '0.0.1'
        }
    ]
});
vcsgraph.newVersion({
    id: 5,
    name: '0.2.0',
    channels: [
        {
            id: 2,
            name: 'test',
            published: '2015-10-03T12:40:00.000+03:00'
        }
    ],
    next: [
    ],
    prev: [
        {
            id: 1,
            name: '0.0.0'
        },
        {
            id: 2,
            name: '0.0.1'
        }
    ]
});


vcsgraph.render();