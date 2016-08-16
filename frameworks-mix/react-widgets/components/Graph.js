import React from "react";


export default class Graph extends React.Component {


    componentDidMount() {
        this.initGraph();
    }


    initGraph() {
        var svg = d3.select(this.svgEl),
            width = +svg.attr("width"),
            height = +svg.attr("height"),
            color = d3.scaleOrdinal(d3.schemeCategory20),
            simulation =
                d3.forceSimulation()
                    .force("link", d3.forceLink().id(function(d) { return d.id; }))
                    .force("charge", d3.forceManyBody())
                    .force("center", d3.forceCenter(width / 2, height / 2));

        d3.json("src/miserables.json", function(error, graph) {
            if (error) throw error;

            var link =
                    svg.append("g")
                        .attr("class", "links")
                        .selectAll("line")
                        .data(graph.links)
                        .enter()
                            .append("line")
                            .attr("stroke-width", function(d) { return Math.sqrt(d.value); }),
                node =
                    svg.append("g")
                        .attr("class", "nodes")
                        .selectAll("circle")
                        .data(graph.nodes)
                        .enter()
                            .append("circle")
                            .attr("r", 5)
                            .attr("fill", function(d) { return color(d.group); })
                            .call(d3.drag()
                                .on("start", dragstarted)
                                .on("drag", dragged)
                                .on("end", dragended));
            node.append("title")
                .text(function(d) { return d.id; });
            simulation
                .nodes(graph.nodes)
                .on("tick", ticked);
            simulation.force("link")
                .links(graph.links);

            function ticked() {
                link.attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });
                node.attr("cx", function(d) { return d.x; })
                    .attr("cy", function(d) { return d.y; });
            }
        });

        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }
    }


    isVisible() {
        return this.svgEl.style.display !== "none";
    }


    setVisibility(visible) {
        this.svgEl.style.display = (visible) ? "block" : "none";
    }


    render() {
        return (
            <svg width={this.props.width} height={this.props.height} ref={(c) => this.svgEl = c}></svg>
        )
    }
}
