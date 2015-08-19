/**
 * Created by s.zhitenev on 18.08.2015.
 */
(function () {
    'use strict';

    var VCSGraph = function (options) {

        options = (typeof options === 'object') ? options : {};

        this.author = options.author || 'Sergey Zhitenev';

        this.canvas = document.getElementById(options.canvasId);
        this.context = this.canvas.getContext('2d');

        this.offsetX = 0;
        this.offsetY = 0;
        this.channels = [];
        this.versions = [];


        this.channelsColors = ['#979797', '#008fb5', '#f1c109']
        this.padding = 20;

    };

    var Version = function (options) {
        options = (typeof options === "object") ? options : {};
        this.name = options.name;
        this.channels = options.channels;
        this.next = options.next;
        this.prev = options.prev;
        this.point = options.point;
        this.x = options.x;
        this.y = options.y;

    };

    var Channel = function (options) {
        options = (typeof options === "object") ? options : {};
        this.id = options.id;
        this.name = options.name;

    };

    VCSGraph.prototype.newChannel = function (options) {

        options = (typeof options === 'object') ? options : {};

        var channel = new Channel(options);

        this.channels.push(channel);
        // console.log(this.channels);

    };

    VCSGraph.prototype.newVersion = function (options) {

        options = (typeof options === 'object') ? options : {};
        options.parent = this;
        options.name = options.name || ' ';
        options.channels = options.channels || [];
        options.next = options.next || [];
        options.prev = options.prev || [];
        options.point = options.point || [];

        var version = new Version(options);

        this.versions.push(version);
        //console.log(this.versions);
    };


    VCSGraph.prototype.calculatePositions = function (versions) {

        var padding = this.padding;

        var sortVersions = function () {
            var newVersions = [];
            var tempVar = {};
            var tempParent = null;

            var i;
            var j = 0;
            for (i = 0; i < versions.length; i += 1) {

                tempParent = versions[i].parent;
                versions[i].parent = null;

                for (j = 0; j < versions[i].channels.length; j += 1) {

                    tempVar = JSON.parse(JSON.stringify(versions[i]));
                    tempVar.channelId = tempVar.channels[j].id;
                    tempVar.channelName = tempVar.channels[j].name;
                    tempVar.published = tempVar.channels[j].published;

                    tempVar.parent = tempParent;

                    delete tempVar.channels;

                    newVersions.push(tempVar);
                }
            }

            newVersions.sort(function (a, b) {
                return new Date(a.published) - new Date(b.published);
            });

            return newVersions;
        };

        var setPositionsOrdinate = function (versions) {


            return versions.map(function (version, index) {
                version.point.y = index * 50 + padding;
                return version;
            });

        };

        var setPositionsAxis = function (versions, channels) {

            var localChannels = channels;

            return versions.map(function (version) {
                var i;
                for (i = 0; i < localChannels.length; i = i + 1) {
                    if (version.channelName == localChannels[i].name) {
                        version.point.x = localChannels[i].x;
                        version.point.color = localChannels[i].color;
                        return version;
                    }
                }
            });
        };

        var localVersions = sortVersions(versions);
        localVersions = setPositionsOrdinate(localVersions);
        localVersions = setPositionsAxis(localVersions, this.channels);

        // console.log(localVersions);

        return localVersions;

    };

    VCSGraph.prototype.styleChannels = function (channels, colors) {

        var padding = this.padding;

        return channels.map(function (channel, i) {
            channel.color = colors[i];
            channel.x = i * 100 + padding;
            return channel;
        })

    };

    VCSGraph.prototype.calculateWindowSize = function (versions) {
        this.canvas.height = versions.length * 50;
    };

    VCSGraph.prototype.drawEdge = function (first, second) {
        console.log('______________', first, second);
    };

    VCSGraph.prototype.render = function () {

        var _this = this;
        this.channels = this.styleChannels(this.channels, this.channelsColors);
        //console.log(this.channels);
        var localVersions = this.calculatePositions(this.versions);
        this.calculateWindowSize(localVersions);

        //console.log(localVersions);


        localVersions.map(function (version) {
            _this.context.beginPath();
            _this.context.arc(version.point.x, version.point.y, 6, 0, 2 * Math.PI, false);
            _this.context.fillStyle = version.point.color;
            _this.context.strokeStyle = version.point.color;
            _this.context.lineWidth = 1;
            _this.context.stroke();
            _this.context.fill();
            _this.context.closePath();
        });

        var i;
        var j;
        for (i = 0; i < localVersions.length; i = i + 1) {
            for (j = i; j < localVersions.length - 1; j = j + 1) {
                this.drawEdge(localVersions[i], localVersions[j]);
            }
        }
    };

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = VCSGraph;
    } else {
        window.VCSGraph = VCSGraph;
        window.VCSGraph.version = Version;
    }

}());