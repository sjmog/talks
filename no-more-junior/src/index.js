require('smoothscroll-polyfill').polyfill()

const MAIN_AREA = document.getElementById('container')
const MAIN_SIZE = 0.8

// turn to your partner. Say hi. They are or have been in the same boat as you. Y'all are in this together.
// Now have a stand and shake.
// OK, that's nice! We're almost there. It's nearly the end. It's Saturday still, you've got the rest of the weekend before Monday.
// Then you've got the rest of the day to do some sweet programming...or not, or whatever.

const LINE_DEFINITIONS = [
  ["  Junior  "], // can we think a bit more with this weird moniker?
  [
    ["Learning isn't for everyone"],
    ["We're old-school"],
    ["We undervalue skills"]
  ],
  [
    ["    Permission to learn    "]
  ],
  [
    ["Young"],
    ["Early-career"],
    ["Not expected to deliver"] // and as we'll see in the actual bit of this talk, this has some pretty bad ramifications.
  ],
  ["   Who else uses 'junior'?   "],
  [
    ["Dads"], // there are ten thousand Donald Trump Jrs for any one Michelle Obama Jr
    ["Paranoid colleagues"], // how nervous do you have to be to assert your seniority only in relation to those you consider "more junior"? We heard about what this does to people in Jo's talk on impostor syndrome.
    ["Archaic workplaces"] // political, legal, and medical systems may have justified reasons to wield "junior" as a weapon to ensure stability. But we're way too soon for that in our industry.
  ],
  ["   Hierarchy   "],
  [
    ["Years of service"],
    ["Job titles"],
    ["Skillset?"]
  ],
  [
    ["Investment bankers"],
    ["Nurses"],
    ["Lawyers"] // and you'd have paid $100s for them in their previous role.
  ],
  [
    ["Deployment"],
    ["Functional programming"], // I've worked with developers that know way more than me about
    ["Microservices"]
  ],
  ["  The alternative?  "],
  ["  Developers ♥ Systems  "],
  [
    ["Your codebase"],
    ["React"],
    ["Your business"]
  ],
  [
    ["Management"],
    ["Decision-making"],
    ["Performance review"] // tara talked about 'fixing all the things': that ain't just code.
  ],
  ["-"],
  ["Learning"], // ok; rant over. Let's do the actual talk now
  ["  Six key ways to build it in  "],
  [
    ["1. Context"],
    ["2. Goals"]
  ],
  [
    ["3. Tasks"],
    ["4. Resources"]
  ],
  [
    ["5. Assessment"],
    ["6. Feedback"]
  ],
  ["   Context   "],
  ["       Start here       "],
  ["Stop demonstrating downwards"],
  ["Start mapping upwards"],
  [
    ["How does my system fit other systems?"],
    ["Where am I doing my work right now?"]
  ],
  [
    ["Diagramming sessions"],
    ["Constant links to the domain"]
  ],
  ["   Goals   "],
  ["(A theory of goal setting & task performance – Locke)"],
  ["What can I say about myself?"],
  [
    ["Specific"],
    ["Aspirational"],
    ["Expected"],
    ["Believed"]
  ],
  ["(Pygmalion in the classroom – Rosenthal and Jacobson)"],
  ["   Tasks   "],
  ["   Everything is an exercise   "],
  [
    ["Time"],
    ["Minimal unblocking"],
    ["Keywords"],
    ["Encouragement"]
  ],
  ["   Resources   "],
  [
    ["You"],
    ["Reading"],
    ["Prep exercises"]
  ],
  ["      Be Socratic*      "],
  [
    ["Ask questions"],
    ["Build a library"],
    ["Keep focussed"]
  ],
  ["  ☠️ ☠️ ☠️ Avoid Tutorials ☠️ ☠️ ☠️  "],
  ["   Assessment   "],
  [
    ["Concretes"],
    ["Concepts"],
    ["Skills"],
    ["Behaviours"]
  ],
  [
    ["Concepts – Ask"],
    ["Skills – Observe"]
  ],
  ["   Feedback   "],
  ["   Have a structure   "],
  ["Build it in with authentic tools"],
  [
    ["Require intentionality"],
    ["Keep it tight"],
    ["Demand iteration"]
  ],
  // ["-"],
  // ["Transformation"],
  // [
  //   ["Jo Franchetti"],
  //   ["Sascha Wolf"],
  //   ["Paula Muldoon"]
  // ],
  // [
  //   ["Tara Ojo"],
  //   ["Taylor Morrison"]
  // ],
  // [
  //   ["Sam Warner"],
  //   ["Violet Peña"],
  //   ["Sam Morgan"]
  // ],
  // ["  (You got this)  "]
]

const mountSegment = segment => {
  var segmentWrap = document.createElement('span')
  segmentWrap.className = "segment"
  segmentWrap.innerHTML = `${segment} `

  return segmentWrap
}

const mountLine = (lineDefinition) => {
  var segments = lineDefinition.map(segmentDefinition => mountSegment(segmentDefinition))
  var lineWrap = document.createElement('span')
  segments.forEach(segment => lineWrap.appendChild(segment))

  return lineWrap
}

const render = (lineDefinitions, container) => {
  var lines = lineDefinitions.map(lineDefinition => mountLine(lineDefinition))
  lines.forEach(line => container.appendChild(line))
  
  $(container).bigtext({ maxfontsize: Infinity })
}

const isOffBottom = element => {
  return element.getBoundingClientRect().bottom > (window.innerHeight * MAIN_SIZE)
}

const unveilNextAndScroll = () => {
  var next = document.querySelectorAll('.segment:not(.unveiled)')[0]
  if (!next) return
  
  next.classList.add('unveiled')

  if (isOffBottom(next)) {
    MAIN_AREA.scrollBy({ top: next.parentElement.offsetHeight, behaviour: 'smooth' })
  }
}

const setupListeners = () => {
  document.addEventListener('click', unveilNextAndScroll)
}

const disableSelection = target => {
  target.style.cursor = "default"

  if (typeof target.onselectstart!="undefined") {
    return target.onselectstart = () => { return false }
  }

  if (typeof target.style.MozUserSelect!="undefined") {
    return target.style.MozUserSelect = "none"
  }
  
  target.onmousedown = () => { return false }
}

render(LINE_DEFINITIONS, document.getElementById('container'))
setupListeners()
disableSelection(document.body)