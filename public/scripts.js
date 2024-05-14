document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.circle-section');

    sections.forEach(section => {
        section.addEventListener('click', () => {
            const content = getContent(section.id);
            showDetails(content, section.id);
        });
    });

    function getContent(id) {
        switch (id) {
            case 'hobby':
                return `
                    <p><strong>Playing basketball:</strong> I love basketball and my favourite team in NBA is <strong>OKC</strong></p>
                    <hr>
                    <p><strong>Watching Movie:</strong> I like to watch drama, action and science fiction movies. My favorite movie is Interstellar</p>
                    <hr>
                    <p><strong>Traveling:</strong> Scenic spots and the seaside are my preferred areas</p>
                    <hr>
                    <p><strong>Listening to music:</strong> I prefer listening to jazz and melodies</p>`;
            case 'achievement':
                return `
                    <p>The China college student innovation competition project I participated in, which is about the implementation of <strong>federated learning</strong> algorithms on the smartphone platform, won the title of Excellent Final Question</p>
                    <hr>
                    <p>I have won the second prize in the 2023 China Mathorcup and Mathematical Modeling Competition</p>
                    <hr>
                    <p>I got an IELTS score of 6.5</p>
                    <hr>
                    <p>I came first two years in a row at the Aberdeen institude of Data Science and Artificial's Basketball Competition</p>`;
            case 'personality':
                return `
                    <p><strong>Gregarious:</strong> I am good at cooperating and communicating with others</p>
                    <hr>
                    <p><strong>Curious:</strong> I have a strong desire to learn and understand new things.</p>
                    <hr>
                    <p><strong>Persistent:</strong> I don't give up easily and strive to overcome challenges.</p>
                    <hr>
                    <p><strong>Always Learning:</strong> I continuously seek opportunities for personal and professional growth.</p>`;
            case 'professional-interest':
                return `
                    <p><strong>Data Mining</strong>Data mining of financial data using deep learning</p>
                    <hr>
                    <p><strong>Artificial Intelligence:</strong> Focus on large models, especially AGI knowledge</p>
                    <hr>
                    <p><strong>Data Science:</strong> Analyzing data to extract meaningful insights.</p>`;
            default:
                return '';
        }
    }


    function showDetails(content, id) {
        const detailsBox = document.getElementById(`details-${id}`);
        detailsBox.innerHTML = content;
        detailsBox.style.display = 'block';
    }


    document.addEventListener('click', (event) => {
        if (!event.target.closest('.circle-section')) {
            document.querySelectorAll('.details-box').forEach(box => {
                box.style.display = 'none';
            })
        }
    });
});
