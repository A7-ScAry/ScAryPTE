/* Original sample materials for ScAry PTE — not official Pearson or APEUni questions. */
window.SCARE_DATA = {
  tasks: [
    {id:'read-aloud',name:'Read Aloud',section:'Speaking',type:'speech-compare',seconds:70,desc:'Read a short academic passage clearly.'},
    {id:'repeat-sentence',name:'Repeat Sentence',section:'Speaking',type:'speech-compare',seconds:35,desc:'Listen once and repeat the sentence.'},
    {id:'describe-image',name:'Describe Image',section:'Speaking',type:'speech-open',seconds:40,desc:'Explain the main trends in a chart.'},
    {id:'retell-lecture',name:'Retell Lecture',section:'Speaking',type:'speech-open',seconds:75,desc:'Summarize a short spoken lecture.'},
    {id:'answer-short-question',name:'Answer Short Question',section:'Speaking',type:'speech-short',seconds:20,desc:'Give a brief spoken answer.'},
    {id:'summarize-group-discussion',name:'Summarize Group Discussion',section:'Speaking',type:'speech-open',seconds:120,desc:'Summarize a three-person discussion.',new:true},
    {id:'respond-to-situation',name:'Respond to a Situation',section:'Speaking',type:'speech-open',seconds:40,desc:'Speak naturally in an everyday situation.',new:true},
    {id:'summarize-written-text',name:'Summarize Written Text',section:'Writing',type:'writing',seconds:600,desc:'Summarize a passage in one sentence.'},
    {id:'write-essay',name:'Write Essay',section:'Writing',type:'writing',seconds:1200,desc:'Write a clear, organized essay.'},
    {id:'reading-fib-dropdown',name:'Fill in the Blanks (Dropdown)',section:'Reading',type:'blanks',seconds:150,desc:'Choose words that complete a passage.'},
    {id:'reading-mcq-multi',name:'Multiple Choice (Multiple)',section:'Reading',type:'multi',seconds:110,desc:'Select all supported answers.'},
    {id:'reorder-paragraph',name:'Reorder Paragraph',section:'Reading',type:'reorder',seconds:150,desc:'Arrange sentences into a logical order.'},
    {id:'reading-fib-dragdrop',name:'Fill in the Blanks (Drag & Drop)',section:'Reading',type:'blanks',seconds:130,desc:'Restore missing words in context.'},
    {id:'reading-mcq-single',name:'Multiple Choice (Single)',section:'Reading',type:'single',seconds:110,desc:'Choose the best answer to a question.'},
    {id:'summarize-spoken-text',name:'Summarize Spoken Text',section:'Listening',type:'writing',seconds:600,desc:'Write a short summary of an audio clip.'},
    {id:'listening-mcq-multi',name:'Multiple Choice (Multiple)',section:'Listening',type:'multi',seconds:120,desc:'Identify multiple correct details from audio.'},
    {id:'listening-fib',name:'Fill in the Blanks (Type In)',section:'Listening',type:'blanks',seconds:140,desc:'Type missing words while listening.'},
    {id:'highlight-correct-summary',name:'Highlight Correct Summary',section:'Listening',type:'single',seconds:120,desc:'Match a recording to the best summary.'},
    {id:'listening-mcq-single',name:'Multiple Choice (Single)',section:'Listening',type:'single',seconds:100,desc:'Answer a question about a recording.'},
    {id:'select-missing-word',name:'Select Missing Word',section:'Listening',type:'single',seconds:90,desc:'Choose the word that completes an audio clip.'},
    {id:'highlight-incorrect-words',name:'Highlight Incorrect Words',section:'Listening',type:'highlight',seconds:120,desc:'Spot differences between audio and text.'},
    {id:'write-from-dictation',name:'Write from Dictation',section:'Listening',type:'dictation',seconds:70,desc:'Type the sentence you hear.'}
  ],
  questions: {
    'read-aloud': [
      {prompt:'Urban gardens can improve life in crowded cities. They provide residents with fresh produce, create spaces for social interaction, and support local wildlife. Researchers also suggest that access to green areas can reduce stress and encourage regular physical activity.'},
      {prompt:'Many scientific discoveries depend on careful observation rather than immediate success. Researchers often repeat experiments, compare results, and revise their explanations before reaching conclusions that can be supported by reliable evidence.'}
    ],
    'repeat-sentence': [
      {audio:'The university library will remain open until midnight during the examination period.'},
      {audio:'Students should submit their research proposals before the end of next week.'}
    ],
    'describe-image': [
      {prompt:'Describe the main information in the chart.',chart:{title:'Daily transport choices among students',labels:['Bus','Walking','Cycling','Car'],values:[45,30,15,10],unit:'%'},keywords:['bus','walking','cycling','car','45','30','15','10','transport'],model:'The bar chart compares students’ daily transport choices. The bus is the most popular option at 45 percent, while walking accounts for 30 percent. Cycling and cars are less common at 15 and 10 percent respectively.'},
      {prompt:'Describe the main information in the chart.',chart:{title:'Library visitors across four months',labels:['January','February','March','April'],values:[120,145,180,160],unit:'visitors'},keywords:['january','february','march','april','120','145','180','160','visitors'],model:'Library visits rose from 120 in January to a peak of 180 in March, before falling slightly to 160 in April. Overall, visits increased over the four-month period.'}
    ],
    'retell-lecture': [
      {audio:'Today we will discuss the value of sleep for learning. During sleep, the brain strengthens memories and organizes newly learned information. Students who sleep consistently often concentrate better and remember more than students who study all night. A regular sleep schedule is therefore an important part of effective study habits.',keywords:['sleep','learning','brain','memories','students','concentrate','schedule'],model:'The lecture explains that sleep is important for learning because it strengthens memories and helps students concentrate. Maintaining a consistent sleep schedule can support more effective study.'},
      {audio:'Renewable energy sources such as sunlight and wind can reduce dependence on fossil fuels. However, their output varies with the weather, so electricity networks must be flexible. Better battery storage and improved transmission systems can help maintain reliable supplies as renewable energy becomes more common.',keywords:['renewable','energy','sunlight','wind','fossil','weather','battery','storage'],model:'The speaker says renewable energy can reduce fossil fuel use, but weather changes affect supply. Battery storage and stronger electricity networks can make renewable energy more reliable.'}
    ],
    'answer-short-question': [
      {audio:'What instrument is used to measure temperature?',correctText:'thermometer',aliases:['a thermometer']},
      {audio:'What do we call a person who studies the stars and planets?',correctText:'astronomer',aliases:['an astronomer']}
    ],
    'summarize-group-discussion': [
      {audio:'Maya says the campus should add more bicycle parking because many students cycle to class. Daniel agrees but points out that existing spaces are often poorly lit at night. Leena suggests placing new bicycle racks near the library and installing brighter lights. All three agree that safe, convenient parking could encourage sustainable travel.',keywords:['bicycle','parking','students','lighting','library','safe','sustainable'],model:'The speakers discuss improving bicycle parking on campus. They agree more spaces are needed, emphasize better lighting for safety, and recommend new racks near the library.'},
      {audio:'Omar explains that an online study group could help commuters. Zoe likes the flexibility but worries that students might miss face-to-face conversations. Priya suggests one in-person meeting each month and online discussions during the week. The group agrees that a hybrid arrangement could make participation easier.',keywords:['online','study','commuters','flexibility','face','monthly','hybrid'],model:'The group considers online study sessions for commuting students. They identify flexibility as a benefit, social connection as a concern, and propose a hybrid model with monthly in-person meetings.'}
    ],
    'respond-to-situation': [
      {prompt:'You borrowed a book from your classmate and accidentally spilled water on a few pages. Speak to your classmate, explain what happened, and suggest a solution.',keywords:['sorry','apologize','book','water','replace','repair','pay'],model:'I am really sorry, but I accidentally spilled some water on the book you lent me. I know it is important to you. I can buy a replacement or pay for the damage, whichever you prefer.'},
      {prompt:'You have been invited to attend a group meeting at 3 p.m., but you have a class until 3:30 p.m. Explain the problem to the group leader and suggest another arrangement.',keywords:['meeting','class','three','late','3:30','join','reschedule'],model:'Thank you for inviting me. I have a class until 3:30, so I cannot arrive at three. Could we start a little later, or would it be all right if I joined as soon as my class finishes?'}
    ],
    'summarize-written-text': [
      {text:'Public libraries have changed significantly in recent years. While books remain an important part of their collections, many libraries now provide digital resources, computer access, workshops and quiet study areas. These services can be especially valuable to people who cannot afford expensive technology or private study spaces. Libraries also organize community events that connect people from different backgrounds. As a result, they continue to serve as important centers for education, inclusion and lifelong learning.',keywords:['libraries','digital','resources','community','education','access','learning'],model:'Modern public libraries support education and inclusion by offering books, digital resources, study spaces and community programs that make learning accessible to more people.'},
      {text:'Remote work has become more common in many industries as communication technology improves. Employees may save time and money by avoiding daily travel, and organizations can recruit workers from a wider geographic area. However, working from home can create challenges related to isolation, collaboration and separating personal life from professional responsibilities. Many employers are experimenting with hybrid schedules in an effort to balance flexibility with opportunities for face-to-face teamwork.',keywords:['remote','work','technology','flexibility','isolation','collaboration','hybrid'],model:'Although remote work offers flexibility and broader recruitment opportunities, challenges involving isolation and teamwork have led many employers to explore hybrid working arrangements.'}
    ],
    'write-essay': [
      {prompt:'Some people believe university education should focus on practical skills, while others think theoretical knowledge is equally important. Discuss both views and give your opinion.',keywords:['university','practical','skills','theoretical','knowledge','education'],model:'A balanced essay can argue that practical skills prepare graduates for employment, while theory provides the principles needed to adapt, innovate and solve unfamiliar problems. A combination of both approaches is often most effective.'},
      {prompt:'Do you think governments should spend more money on public transport than on building new roads? Give reasons and examples to support your answer.',keywords:['government','public','transport','roads','traffic','environment'],model:'A balanced essay can consider how public transport reduces congestion and emissions while road investment may be necessary for access and freight. Explain which investment should take priority and why.'}
    ],
    'reading-fib-dropdown': [
      {text:'Regular exercise can {{}} concentration and strengthen physical health. Even a short daily walk may help people feel more {{}} and better prepared for work.',blanks:[['improve','remove','delay'],['energetic','confused','silent']],correct:['improve','energetic']},
      {text:'Scientists collect {{}} before they draw conclusions. They then examine the results to determine whether their original {{}} is supported.',blanks:[['evidence','furniture','weather'],['hypothesis','schedule','journey']],correct:['evidence','hypothesis']}
    ],
    'reading-mcq-multi': [
      {text:'Community gardens provide small plots where residents can grow vegetables and flowers. Volunteers often share tools and knowledge. Some gardens host educational programs for local schools, and the green spaces can offer habitats for insects and birds.',prompt:'Which benefits are mentioned in the passage?',choices:['Sharing gardening knowledge','Creating wildlife habitats','Reducing all traffic congestion','Hosting school programs'],correct:[0,1,3]},
      {text:'Online courses allow learners to study at a convenient time, but they require self-discipline. Many programs provide discussion forums, recorded lessons and quizzes. Students may struggle if their internet connection is unreliable.',prompt:'Which statements are supported?',choices:['Courses can offer recorded lessons','Reliable internet can matter','Online learning never requires discipline','Discussion forums may be available'],correct:[0,1,3]}
    ],
    'reorder-paragraph': [
      {items:['This change made travel more convenient for residents.','The city council introduced a new bus route last year.','As a result, more people began using public transport.','The route connected several neighborhoods to the main railway station.'],correct:[1,3,0,2]},
      {items:['These findings were later published in a scientific journal.','First, the team designed a controlled experiment.','The researchers wanted to test how light affected plant growth.','They then compared the results from plants grown under different conditions.'],correct:[2,1,3,0]}
    ],
    'reading-fib-dragdrop': [
      {text:'A healthy diet includes a {{}} of foods. Fruits and vegetables provide essential {{}}, while drinking enough water helps the body function {{}}.',blanks:[['variety','absence','fear'],['nutrients','tickets','machines'],['properly','rarely','angrily']],correct:['variety','nutrients','properly']},
      {text:'Many museums preserve important {{}} objects. Exhibitions allow visitors to learn about the {{}} and understand how societies have {{}} over time.',blanks:[['historical','temporary','imaginary'],['past','weather','future'],['changed','stopped','disappeared']],correct:['historical','past','changed']}
    ],
    'reading-mcq-single': [
      {text:'Researchers have found that spending short periods outdoors can improve mood and help people recover from mental fatigue. Parks are especially useful in densely populated cities where quiet places may be difficult to find.',prompt:'What is the main idea?',choices:['Outdoor spaces can support mental well-being','Cities should remove public parks','People should avoid exercising outdoors','Mental fatigue has no connection to environment'],correct:0},
      {text:'Electric buses are becoming more common because they produce no exhaust emissions while operating. However, their environmental impact also depends on how the electricity used to charge them is generated.',prompt:'What does the author emphasize?',choices:['Electric buses are always powered by solar energy','The source of electricity matters when evaluating environmental impact','Electric buses cannot travel in cities','All charging stations use the same technology'],correct:1}
    ],
    'summarize-spoken-text': [
      {audio:'Many cities are developing urban forests to improve air quality and reduce summer temperatures. Trees provide shade, absorb carbon dioxide and create habitats for animals. However, successful projects require suitable species, regular watering and long-term maintenance. Community participation can also help protect newly planted trees.',keywords:['cities','trees','shade','temperature','carbon','maintenance','community'],model:'The speaker discusses urban forests, which can cool cities, improve air quality and support wildlife. Successful planting projects depend on suitable trees, ongoing maintenance and community involvement.'},
      {audio:'Digital payments have made many everyday transactions faster and more convenient. People can pay for transport, groceries and bills using their phones. However, security remains important, as users must protect passwords and recognize suspicious messages. Digital literacy can help consumers take advantage of these services safely.',keywords:['digital','payments','convenient','security','passwords','literacy'],model:'The lecture explains that digital payments make transactions more convenient, but users need good security habits and digital literacy to avoid risks.'}
    ],
    'listening-mcq-multi': [
      {audio:'The new science museum will open on Saturday. Admission is free for children under twelve, and the museum offers guided tours every afternoon. The café will remain closed during the first week.',prompt:'Which statements are correct?',choices:['The museum opens on Saturday','Children under twelve enter free','The café opens on the first day','Guided tours are available in the afternoon'],correct:[0,1,3]},
      {audio:'The university is organizing a volunteer day next month. Participants can help clean the riverbank or plant trees in the park. Gloves and tools will be provided, but students should bring their own drinking water.',prompt:'Which details were mentioned?',choices:['Tools will be provided','Students should bring drinking water','The activity is taking place tomorrow','Volunteers may plant trees'],correct:[0,1,3]}
    ],
    'listening-fib': [
      {text:'The university has introduced a new {{}} program to support students during their first {{}} on campus.',blanks:[['mentoring'],['semester']],correct:['mentoring','semester'],audio:'The university has introduced a new mentoring program to support students during their first semester on campus.'},
      {text:'Regular {{}} helps researchers identify patterns and draw more accurate {{}}.',blanks:[['observation'],['conclusions']],correct:['observation','conclusions'],audio:'Regular observation helps researchers identify patterns and draw more accurate conclusions.'}
    ],
    'highlight-correct-summary': [
      {audio:'A local school has introduced a recycling program. Students collect paper and plastic, while teachers explain how waste affects the environment. The school hopes the project will build lasting habits that students can use at home.',prompt:'Choose the summary that best matches the recording.',choices:['A school recycling initiative teaches students environmental responsibility.','Teachers have banned all plastic products from the city.','A school is opening a new science laboratory.','Students are studying the history of paper production.'],correct:0},
      {audio:'A study found that people who take short breaks while working often maintain their attention better than those who work continuously for long periods. Researchers suggest that regular pauses can reduce fatigue and improve productivity.',prompt:'Choose the best summary.',choices:['Long working hours always improve attention.','Taking regular short breaks may improve focus and productivity.','Researchers found that breaks reduce all motivation.','The study compared different kinds of office furniture.'],correct:1}
    ],
    'listening-mcq-single': [
      {audio:'Due to repairs on the main road, the campus shuttle will depart from the east entrance this afternoon instead of its usual stop beside the library.',prompt:'Where will the campus shuttle depart from this afternoon?',choices:['Beside the library','The main railway station','The east entrance','The sports center'],correct:2},
      {audio:'The guest lecture on ocean pollution has been moved from Thursday to Friday because the speaker is arriving one day later than planned.',prompt:'When will the guest lecture take place?',choices:['Wednesday','Thursday','Friday','Saturday'],correct:2}
    ],
    'select-missing-word': [
      {audio:'The lecturer reminded students that the final research report must be submitted before the end of',prompt:'Which option best completes the last part of the recording?',choices:['the semester','the museum','the airport','the experiment'],correct:0},
      {audio:'Because the weather forecast predicts heavy rain, the outdoor concert has been moved into the',prompt:'Choose the missing ending.',choices:['parking ticket','indoor auditorium','public newspaper','travel brochure'],correct:1}
    ],
    'highlight-incorrect-words': [
      {audio:'The museum will open on Friday for essential cleaning and staff training.',text:'The museum will close on Friday for essential cleaning and staff training.',correct:[3]},
      {audio:'Students can borrow two books at a time from the central library.',text:'Students can borrow three books at a time from the central library.',correct:[3]}
    ],
    'write-from-dictation': [
      {audio:'All assignment deadlines are listed on the student portal.'},
      {audio:'The research findings will be discussed in tomorrow’s seminar.'}
    ]
  }
};
