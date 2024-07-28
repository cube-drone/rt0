function eddyTemplate({arcana, snippets, skills}){
    return `
    <div id="reportcard" class="report-card">
        <header>
            <h2>Eddy Name: </h2>
            <div class="student-name"></div>
        </header>

        <div class="skill-check-helper">
            ${snippets.skillchecksHtml}
        </div>

        <style>
            .eddy-combat {
                grid-column: 1;
                grid-row: 2 / 14;
                font-size: x-small;
                border: 1px solid black;
                padding: 5px;
                border-box: box-sizing;
            }

            .eddy-combat ul {
                margin: 0;
                padding: 0;
            }

            .eddy-combat li {
                padding-left: 5px;
                list-style-type: none;
            }

            .eddy-help {
                grid-column: 2 / 4;
                grid-row: 1 / 5;
                border: 1px solid black;
                padding: 5px;
                border-box: box-sizing;
            }
        </style>

        <div class="eddy-combat">
            <h3> Combat </h3>
            <li class='${arcana.eddy.abilities.any.slug}'><strong>${arcana.eddy.abilities.any.name}</strong> &mdash; ${arcana.eddy.abilities.any.descriptionHtml}</li>
            <li class='${arcana.eddy.abilities.cup.slug}'><strong>${arcana.eddy.abilities.cup.name}</strong> &mdash; ${arcana.eddy.abilities.cup.descriptionHtml}</li>
            <li class='${arcana.eddy.abilities.sword.slug}'><strong>${arcana.eddy.abilities.sword.name}</strong> &mdash; ${arcana.eddy.abilities.sword.descriptionHtml}</li>
            <li class='${arcana.eddy.abilities.major.slug}'><strong>${arcana.eddy.abilities.major.name}</strong> &mdash; ${arcana.eddy.abilities.major.descriptionHtml}</li>
            ${
                Object.keys(arcana.eddy.abilities).filter(key => key != "cup" && key != "sword" && key != "any" && key != "major").map((key) => {
                    let cardability = arcana.eddy.abilities[key];
                    return `
                    <li class='${cardability.slug}'><strong>${cardability.name}</strong> &mdash; ${cardability.descriptionHtml}</li>
                    `
                }).join('')
            }
        </div>

        <div class="eddy-help">
            ${arcana.eddy.descriptionHtml}
            ${arcana.eddy.specialHtml}
        </div>

        <div class="creation">
            <h3> Creation </h3>
            <p> &rarr; Choose one skill. It's the only skill you can use! </p>
        </div>

        ${ skills.map((skill, i) => `
            <style>
                .skill.${skill.slug} {
                    grid-column: 3;
                    grid-row: ${5+i} / ${6+i};
                }

            </style>
            <div class="skill ${skill.slug}">
                <h3 class="class-title">${skill.name}</h3>
                <div class="skill-title">${skill.description}</div>
                <div class="skill-attributes">${skill.abilities}</div>
                <div class="box box-bottom-right"></div>
            </div>`).join('')
        }

    </div>
    `;

}

module.exports = {
    eddyTemplate,
}