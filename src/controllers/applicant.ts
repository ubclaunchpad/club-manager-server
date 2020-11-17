import Applicant, { IApplicant } from '../models/applicant';

export const createApplicant = async (req, res) => {
    const new_applicant: IApplicant = new Applicant({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        major: req.body.major,
        yearStanding: req.body.yearStanding,
        status: req.body.status,
        linkedIn: req.body.linkedIn,
        website: req.body.website,
        resume: req.body.resume,
    });

    try {
        await new_applicant.save();
        res.status(201).send('Successfully created new applicant.');
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateApplicantStatus = async (req, res) => {
    try {
        const valid_status = ['Pending', 'Accepted', 'Rejected', 'Scheduled'];
        const my_applicant = await Applicant.findOne({ _id: req.body.id });

        // Check that status is valid
        if (!valid_status.includes(req.body.status)) {
            res.status(400).send(`"${req.body.status}" is not a valid status.`);
        }
        // Check that applicant exists in the database
        else if (my_applicant == null) {
            res.status(400).send('No applicants match that id');
        }
        // Idempotent when status would be unchanged
        else if (my_applicant.status === req.body.status) {
            res.status(200).send(`Status already set to "${req.body.status}"`);
        }
        // Update the applicant's status
        else {
            my_applicant.status = req.body.status;
            await my_applicant.save();
            res.status(200).send(`Successfully set status to "${req.body.status}"`);
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

export const listAllApplicants = async (req, res) => {
    try {
        const applicants = await Applicant.find();
        res.status(201).send(applicants);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};
