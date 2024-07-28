function reportCardTemplate({snippets, skills}){
    return `
    <div id="reportcard" class="report-card">
        <header>
            <h2>Report Card / Student Name: </h2>
            <div class="student-name"></div>
        </header>

        <div class="skill-check-helper">
            ${snippets.skillchecksHtml}
        </div>

        <div class="ability strong">
            <div class="box box-right"></div>
            <div class="strong-ability">
                <h4 class="ability-title">Strong</h4>
                <div class="ability-description"><span class="keyword">Strong</span> characters deal extra combat damage.</div>
            </div>
            <hr/>
            <div class="box box-right"></div>
            <div class="weak-ability">
                <h4 class="ability-title">Weak</h4>
                <div class="ability-description"><span class="keyword">Weak</span> characters deal less combat damage.</div>
            </div>
        </div>
        <div class="ability fast">
            <div class="box box-right"></div>
            <div class="strong-ability">
                <h4 class="ability-title">Fast</h4>
                <div class="ability-description"><span class="keyword">Fast</span> characters move and block more easily in combat.</div>
            </div>
            <hr/>
            <div class="box box-right"></div>
            <div class="weak-ability">
                <h4 class="ability-title">Slow</h4>
                <div class="ability-description"><span class="keyword">Slow</span> characters move more slowly and block less effectively in combat.</div>
            </div>
        </div>
        <div class="ability clever">
            <div class="box box-right"></div>
            <div class="strong-ability">
                <h4 class="ability-title">Clever</h4>
                <div class="ability-description"><span class="keyword">Clever</span> characters have more effective magic.</div>
            </div>
            <hr/>
            <div class="box box-right"></div>
            <div class="weak-ability">
                <h4 class="ability-title">Dull</h4>
                <div class="ability-description"><span class="keyword">Dull</span> characters cannot learn or use magic spells.</div>
            </div>
        </div>
        <div class="ability wise">
            <div class="box box-right"></div>
            <div class="strong-ability">
                <h4 class="ability-title">Wise</h4>
                <div class="ability-description"><span class="keyword">Wise</span> characters draw more cards.</div>
            </div>
            <hr/>
            <div class="box box-right"></div>
            <div class="weak-ability">
                <h4 class="ability-title">Foolish</h4>
                <div class="ability-description"><span class="keyword">Foolish</span> characters gain the <span class="keyword">Honk</span> ability, costing them cards in combat.</div>
            </div>
        </div>
        <div class="ability lucky">
            <div class="box box-right"></div>
            <div class="strong-ability">
                <h4 class="ability-title">Lucky</h4>
                <div class="ability-description">When choosing <span class="keyword">Lucky</span>, remove all aces and twos from your deck.</div>
            </div>
            <hr/>
            <div class="box box-right"></div>
            <div class="weak-ability">
                <h4 class="ability-title">Unlucky</h4>
                <div class="ability-description">When choosing <span class="keyword">Unlucky</span>, remove all kings and queens from your deck.</div>
            </div>
        </div>
        <div class="ability charming">
            <div class="box box-right"></div>
            <div class="strong-ability">
                <h4 class="ability-title">Charming</h4>
                <div class="ability-description"><span class="keyword">Charming</span> characters accumulate less corruption, through the power of <span class="keyword">friendship</span>.</div>
            </div>
            <hr/>
            <div class="box box-right"></div>
            <div class="weak-ability">
                <h4 class="ability-title">Strange</h4>
                <div class="ability-description"><span class="keyword">Strange</span> characters cannot use <span class="keyword">friendship</span>.</div>
            </div>
        </div>

        <div class="creation">
            <h3> Creation </h3>
            <p> &larr; At character creation, gain an ability as well as a weakness. </p>
            <p> &rarr; At character creation, gain a skill and cross out a skill. </p>
        </div>

        <div class="skill skill-corruption">
            <div class="corruption-circle box-right"></div>
            <div class="corruption-circle box-right"></div>
            <div class="corruption-circle box-right"></div>
            <h3>Skill Corruption</h3>
            <p> When all circles are filled, gain a skill and cross out a skill. </p>
        </div>

        <div class="skill magic-corruption">
            <div class="corruption-circle box-right"></div>
            <div class="corruption-circle box-right"></div>
            <div class="corruption-circle box-right"></div>
            <h3>Magic Corruption</h3>
            <p> When all circles are filled, gain a magic spell if not <span class="keyword">Dull</span>. </p>
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
    reportCardTemplate,
}