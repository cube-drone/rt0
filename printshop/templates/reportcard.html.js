function reportCardTemplate({}){
    return `
    <div id="reportcard" class="report-card">
        <header>
            <h2>Report Card / Student Name: </h2>
            <div class="student-name"></div>
        </header>

        <div class="skill-check-helper">
            <h3>Skill Checks</h3>

            <ul>
                <li>
                    <h4 class="skill-card">Tower, The Devil, Death</h4>
                    <div class="skill-card-description"><span class="keyword">Critical Failure</span>, always fails.</div>
                </li>
                <li>
                    <h4 class="skill-card">The Player's Major Arcana</h4>
                    <div class="skill-card-description"><span class="keyword">Critical Success</span>, always succeeds.</div>
                </li>
                <li>
                    <h4 class="skill-card">Fool, The World, The Sun</h4>
                    <div class="skill-card-description"><span class="keyword">Critical success</span>, always succeeds.</div>
                </li>
                <li>
                    <h4 class="skill-card">Wheel of Fortune</h4>
                    <div class="skill-card-description">Draw another card.</div>
                    <div class="skill-card-description">10-K or Major Arcana: <span class="keyword">Critical Success</span>
                    <div class="skill-card-description">Otherwise: <span class="keyword">Critical Failure</span></div>
                </li>
                <li>
                    <h4 class="skill-card">Ace to Five</h4>
                    <div class="skill-card-description">Can pass a trivial check, otherwise fails</div>
                </li>
                <li>
                    <h4 class="skill-card">Six to Nine</h4>
                    <div class="skill-card-description">Can pass an easy or trivial check, otherwise fails</div>
                </li>
                <li>
                    <h4 class="skill-card">Ten to King</h4>
                    <div class="skill-card-description">Can pass a medium, easy, or trivial check, otherwise fails</div>
                </li>
                <li>
                    <h4 class="skill-card">Major Arcana</h4>
                    <div class="skill-card-description">Can pass a hard, medium, easy, or trivial check, otherwise fails</div>
                </li>
            </ul>

            <h3>Bonus / Penalty</h3>
            <p> <span class="keyword">bonus</span> on a skill check: draw an additional card and choose the best one.</p>
            <p> <span class="keyword">penalty</span> on a skill check: draw an additional card and choose the worst one.</p>

            <h3>Corruption Retry</h3>
            <p> Take a corruption point to retry a failed skill check: this time, one step easier. </p>

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
                <h4 class="ability-title">Repulsive</h4>
                <div class="ability-description"><span class="keyword">Repulsive</span> characters cannot use <span class="keyword">friendship</span>.</div>
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

        <div class="skill finaid">
            <h3 class="class-title">Financial Aid</h3>
            <div class="skill-title">Empathy, Perception & Danger Sense</div>
            <div class="skill-attributes">Fast / Lucky</div>
            <div class="box box-bottom-right"></div>
        </div>

        <div class="skill drama">
            <h3 class="class-title">Drama</h3>
            <div class="skill-title">Deception, Persuasion & Performance</div>
            <div class="skill-attributes">Charming / Fast</div>
            <div class="box box-bottom-right"></div>
        </div>

        <div class="skill sci">
            <h3 class="class-title">Science</h3>
            <div class="skill-title">Computers, Chemistry, Biology, Physics & Math</div>
            <div class="skill-attributes">Clever / Charming</div>
            <div class="box box-bottom-right"></div>
        </div>

        <div class="skill free">
            <h3 class="class-title">Free Block</h3>
            <div class="skill-title">Stealth, Breaking & Entering</div>
            <div class="skill-attributes">Clever / Fast</div>
            <div class="box box-bottom-right"></div>
        </div>

        <div class="skill gym">
            <h3 class="class-title">Gym</h3>
            <div class="skill-title">Movement, Sport & Dance</div>
            <div class="skill-attributes">Strong / Fast</div>
            <div class="box box-bottom-right"></div>
        </div>

        <div class="skill aid">
            <h3 class="class-title">Aid</h3>
            <div class="skill-title">First Aid, Exploration & Survival</div>
            <div class="skill-attributes">Wise / Charming</div>
            <div class="box box-bottom-right"></div>
        </div>

        <div class="skill shop">
            <h3 class="class-title">Shop</h3>
            <div class="skill-title">Mechanical, Constructive & Culinary</div>
            <div class="skill-attributes">Wise / Strong</div>
            <div class="box box-bottom-right"></div>
        </div>

        <div class="skill law">
            <h3 class="class-title">Law</h3>
            <div class="skill-title">Bureaucracy, Legal & Investigative</div>
            <div class="skill-attributes">Wise / Clever</div>
            <div class="box box-bottom-right"></div>
        </div>

        <div class="skill misc">
            <h3 class="class-title">Misc</h3>
            <div class="skill-title">Everything Not Otherwise Covered</div>
            <div class="skill-attributes">Lucky / Strong</div>
            <div class="box box-bottom-right"></div>
        </div>
    </div>
    `;

}

module.exports = {
    reportCardTemplate,
}